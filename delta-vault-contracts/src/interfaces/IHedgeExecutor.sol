// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IStruct} from "./IStruct.sol";

interface IHedgeExecutorDef is IStruct {
    event PriceCheck(address indexed product, uint256 currentPrice);
    event KnockIn(address indexed product, uint256 triggerPrice);
    event KnockOut(address indexed product, uint256 triggerPrice);
    event ProductStatusChange(address indexed product, DeltaVaultResultStatus currentStatus);
}

interface IHedgeExecutor is IHedgeExecutorDef {
    function registerProduct() external;
}
