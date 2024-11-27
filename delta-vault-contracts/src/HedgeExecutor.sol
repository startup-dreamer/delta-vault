// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IHedgeExecutor} from "src/interfaces/IHedgeExecutor.sol";
import {IDeltaVaultProduct} from "src/interfaces/IDeltaVaultProduct.sol";

contract HedgeExecutor is IHedgeExecutor, AccessControl {
    bytes32 public constant KEEPER_ROLE = keccak256("KEEPER_ROLE");

    mapping(string => bytes32) private pythPriceFeedIds;
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

    function registerProduct() external {
        address productAddr = msg.sender;

        productIndexes[productAddr] = monitorProductList.length;
        monitorProductList.push(productAddr);
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
            _hedge();
        }
    }

    function _hedge() internal {
        for (uint256 i = 0; i < monitorProductList.length; i++) {
            address productAddr = monitorProductList[i];
            IDeltaVaultProduct p = IDeltaVaultProduct(productAddr);
            p.hedge();
        }
    }
}
