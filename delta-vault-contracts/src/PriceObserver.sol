// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IPriceObserver.sol";

contract PriceObserver is IPriceObserver, AccessControl {
    bytes32 public constant KEEPER_ROLE = keccak256("KEEPER_ROLE");

    mapping(address => ProductInfo) private productInfos;
    mapping(address => ProductResult) private productResult;
    address[] private monitorProductList;
    mapping(address => uint256) private productIndexes;

    uint256 public immutable interval;
    uint256 public lastTimeStamp;

    IPyth public immutable pyth;

    constructor(uint256 updateInterval, uint256 startTime, address pythAddress) {
        interval = updateInterval;
        lastTimeStamp = startTime;
        pyth = IPyth(pythAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addKeeper(address keeper) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(KEEPER_ROLE, keeper);
    }

    function getProductResult(address productAddr)
        external
        view
        returns (DeltaVaultResultStatus, uint256 period, uint256 endPrice)
    {
        ProductResult memory ps = productResult[productAddr];

        return (ps.status, ps.validPeriod, ps.endPrice);
    }

    function registerProduct(ProductInfo calldata productInfo) external {
        address productAddr = msg.sender;

        productInfos[productAddr] = productInfo;
        productResult[productAddr].status = DeltaVaultResultStatus.NotEnd;

        productIndexes[productAddr] = monitorProductList.length;
        monitorProductList.push(productAddr);

        emit ProductStatusChange(productAddr, DeltaVaultResultStatus.NotEnd);
    }

    function checkUpkeep(bytes calldata /* checkData */ )
        external
        view
        onlyRole(KEEPER_ROLE)
        returns (bool upkeepNeeded, bytes memory performData)
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    function performUpkeep(bytes calldata /* performData */ ) external onlyRole(KEEPER_ROLE) {
        if ((block.timestamp - lastTimeStamp) > interval) {
            // set timestamp
            lastTimeStamp = block.timestamp - block.timestamp % interval;
            _fetchProductPrice();
        }
    }

    function _fetchProductPrice() internal {
        for (uint256 i = 0; i < monitorProductList.length; i++) {
            address productAddr = monitorProductList[i];
            ProductInfo memory product = productInfos[productAddr];

            // product not start yet, check next one
            if (product.startTime > block.timestamp) {
                continue;
            }

            // Get price from Pyth
            PythStructs.Price memory priceData = pyth.getPrice(product.targetTokenPythId);
            uint256 currentPrice = uint256(uint64(priceData.price) * 10 ** 10);

            emit PriceCheck(productAddr, currentPrice);

            ProductResult memory ps = productResult[productAddr];

            // judge whether knock in or knock in out now
            if (currentPrice >= product.targetKnockOutPrice) {
                ps.KnockOut = true;
                emit KnockOut(productAddr, currentPrice);
            } else if (currentPrice <= product.targetKnockInPrice) {
                ps.KnockIn = true;
                emit KnockIn(productAddr, currentPrice);
            } else {
                return;
            }

            // if knock out happened, end product
            if (ps.KnockOut) {
                if (ps.KnockIn) {
                    ps.status = DeltaVaultResultStatus.InAndOut;
                    ps.endPrice = uint200(currentPrice);
                    ps.validPeriod = uint32(block.timestamp - product.startTime);
                } else {
                    ps.status = DeltaVaultResultStatus.OnlyOut;
                    ps.endPrice = uint200(currentPrice);
                    ps.validPeriod = uint32(block.timestamp - product.startTime);
                }

                _endProduct(productAddr);
            }

            // if time is up, end product
            if (block.timestamp - product.startTime > product.period) {
                if (ps.KnockIn) {
                    ps.status = DeltaVaultResultStatus.OnlyIn;
                } else {
                    ps.status = DeltaVaultResultStatus.NorInOrOut;
                }

                _endProduct(productAddr);
            }

            emit ProductStatusChange(productAddr, ps.status);

            productResult[productAddr] = ps;
        }
    }

    /**
     * @dev remove product from monitor list
     * @param productAddr product address
     */
    function _endProduct(address productAddr) internal {
        uint256 productIndex = productIndexes[productAddr];
        address lastProduct = monitorProductList[monitorProductList.length - 1];

        // swap current product with last one and pop
        monitorProductList[productIndex] = lastProduct;

        // disable the product index
        productIndexes[productAddr] = type(uint256).max;

        // set the right index to swaped product
        productIndexes[lastProduct] = productIndex;

        monitorProductList.pop();
    }
}
