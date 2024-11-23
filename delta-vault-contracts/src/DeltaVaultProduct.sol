// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IDeltaVaultProduct} from "src/interfaces/IDeltaVaultProduct.sol";
import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import {IPriceObserver, IPriceObserverDef} from "src/interfaces/IPriceObserver.sol";
import {IUniswapV2Router01} from "src/interfaces/IUniswapV2Router01.sol";

contract DeltaVaultProduct is IDeltaVaultProduct, IPriceObserverDef {
    using SafeERC20 for IERC20;
    using BitMaps for BitMaps.BitMap;

    uint256 constant PROFIT_BASE = 10000;
    uint256 constant TRADE_SHARD = 10;

    // target token address
    address public _targetToken;
    bytes32 public _targetTokenPythId;
    uint8 public _targetDecimal;
    // target token price, in per usd, decimal equal the price feed
    uint256 public _targetInitPrice;
    uint256 public _targetKnockInPrice;
    uint256 public _targetKnockOutPrice;

    address public _usdToken;
    bytes32 public _usdPythId;
    IPyth public pyth;
    mapping(address => uint256) public _boughtAmount;

    uint32 public _startTime;
    uint32 public _period;
    uint16 public _baseProfit; // decimal is 4

    uint256 public totalBoughtAmount;

    // wether the user had claimed the reward
    BitMaps.BitMap internal _claimed;

    address public _priceObserver;

    address _uniswapV2Router;
    address _lpToken;

    /**
     * @dev one contract for one target asset, only support WETH/WBTC
     */
    function initialize(ProductInitArgs calldata args) public override {
        _targetToken = args.targetToken;
        _targetTokenPythId = args.targetTokenPythId;
        _targetInitPrice = args.targetInitPrice;
        _targetKnockInPrice = args.targetKnockInPrice;
        _targetKnockOutPrice = args.targetKnockOutPrice;
        _startTime = uint32(args.startTime);
        _period = uint32(args.period);
        _baseProfit = uint16(args.baseProfit);
        _usdToken = args.usdToken;
        _usdPythId = args.usdPythId;
        pyth = IPyth(args.pythAddress);

        _targetDecimal = IERC20Metadata(args.targetToken).decimals();

        _priceObserver = args.priceObserver;

        // register product
        IPriceObserver(_priceObserver).registerProduct(
            ProductInfo(
                args.targetTokenPythId,
                args.targetInitPrice,
                args.targetKnockInPrice,
                args.targetKnockOutPrice,
                args.startTime,
                args.period,
                args.baseProfit
            )
        );
    }

    /**
     * @dev user buy some share on the DeltaVault
     * @param amount amount of usd token you want to pay
     */
    function buyShare(uint256 amount, bytes[] calldata priceUpdateData) public payable returns (uint256) {
        if (block.timestamp >= _startTime) {
            revert DeltaVaultStarted();
        }

        // transfer usd token
        IERC20(_usdToken).safeTransferFrom(msg.sender, address(this), amount);

        uint256 usdPrice = getLatestPrice(_usdPythId, priceUpdateData);
        uint256 targetPrice = getLatestPrice(_targetTokenPythId, priceUpdateData);

        uint256 dstAmount = usdPrice * amount * 10 ** _targetDecimal / (_targetInitPrice * 10 ** IERC20Metadata(_usdToken).decimals());

        _boughtAmount[msg.sender] += dstAmount;
        totalBoughtAmount += dstAmount;

        emit BuyShare(msg.sender, amount, dstAmount);

        return dstAmount;
    }

    function claimReward() public returns (uint256 reward) {
        if (_claimed.get(uint160(msg.sender))) {
            revert Claimed();
        }

        _claimed.set(uint160(msg.sender));

        (IPriceObserver.DeltaVaultResultStatus status, uint256 validPeriod, uint256 endPrice) =
            IPriceObserver(_priceObserver).getProductResult(address(this));

        if (status == DeltaVaultResultStatus.NotEnd) {
            revert DeltaVaultNotEnded();
        }

        uint256 initUSDAmount = _boughtAmount[msg.sender] * _targetInitPrice
            * 10 ** IERC20Metadata(_usdToken).decimals()
            / (10 ** IERC20Metadata(_targetToken).decimals());

        uint256 allPeriodProfitUSDAmount = initUSDAmount * _baseProfit / PROFIT_BASE;

        // judge the condition and give corspoding reward
        if (status == DeltaVaultResultStatus.NorInOrOut) {
            // if not knock in nor knock out
            // reward all reward
            reward = initUSDAmount + allPeriodProfitUSDAmount;
            IERC20(_usdToken).safeTransfer(msg.sender, reward);
        } else if (status == DeltaVaultResultStatus.InAndOut || status == DeltaVaultResultStatus.OnlyOut) {
            // if knock in and knock out, or only knock out
            // reward the valid period part of reward
            reward = initUSDAmount + allPeriodProfitUSDAmount * validPeriod / _period;
            IERC20(_usdToken).safeTransfer(msg.sender, reward);
        } else if (status == DeltaVaultResultStatus.OnlyIn) {
            // if knock in but no knock out
            if (endPrice > _targetInitPrice) {
                // if end price larger than init price, user get invest amount back
                reward = initUSDAmount;
                IERC20(_usdToken).safeTransfer(msg.sender, reward);
            } else {
                reward = initUSDAmount
                    - initUSDAmount * (endPrice - _targetKnockInPrice) / (_targetKnockOutPrice - _targetKnockInPrice);

                // if end price smaller than init price, user get part loss
                IERC20(_usdToken).safeTransfer(msg.sender, reward);
            }
        }
    }

    /**
     * @dev WIP
     * @dev Use uniswap v2 just for a simple demo
     * @dev For the sake of convenience, security issues will not be considered for the time being
     */
    function hedge() public {
        uint256 currentPrice = getLatestPrice(_targetTokenPythId, new bytes[](0));
        uint256 initUSDAmount = totalBoughtAmount * _targetInitPrice
            * 10 ** IERC20Metadata(_usdToken).decimals()
            / (10 ** IERC20Metadata(_targetToken).decimals());
        uint256 BalanceU = IERC20(_usdToken).balanceOf(address(this));
        uint256 targetAssetsInU = IERC20(_targetToken).balanceOf(address(this)) * currentPrice
            * 10 ** IERC20Metadata(_usdToken).decimals()
            / (10 ** IERC20Metadata(_targetToken).decimals());

        address[] memory paths;

        // should sell
        if (currentPrice > _targetInitPrice) {
            uint256 sellAmountInTargetToken =
                ((targetAssetsInU - initUSDAmount * getLatestPrice(_usdPythId, new bytes[](0))) / getLatestPrice(_targetTokenPythId, new bytes[](0)));
            uint256 expectOut;
            IUniswapV2Router01(_uniswapV2Router).swapTokensForExactTokens(
                expectOut, sellAmountInTargetToken, paths, address(this), block.timestamp
            );
        } else {
            // should buy

            uint256 buyAmountInU = initUSDAmount - targetAssetsInU;
            uint256 expectOut;
            IUniswapV2Router01(_uniswapV2Router).swapTokensForExactTokens(
                expectOut, buyAmountInU, paths, address(this), block.timestamp
            );
        }
    }

    /**
     * @notice Returns the latest price
     *
     * @return latest price
     */
    function getLatestPrice(bytes32 priceId, bytes[] memory priceUpdateData) public payable returns (uint256) {
        // Update price feeds and pay the fee
        uint fee = pyth.getUpdateFee(priceUpdateData);
        pyth.updatePriceFeeds{value: fee}(priceUpdateData);

        // Get the current price
        PythStructs.Price memory price = pyth.getPrice(priceId);
        
        // Convert price to uint256 and scale appropriately
        // Note: Pyth prices typically use 8 decimals
        return uint256(uint64(price.price) * 10 ** 10);
    }
}
