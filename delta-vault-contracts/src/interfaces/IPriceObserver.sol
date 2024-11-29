// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IStruct} from "./IStruct.sol";

interface IPriceObserverDef is IStruct {
    event PriceCheck(address indexed product, uint256 currentPrice);
    event KnockIn(address indexed product, uint256 triggerPrice);
    event KnockOut(address indexed product, uint256 triggerPrice);
    event ProductStatusChange(address indexed product, DeltaVaultResultStatus currentStatus);
}

interface IPriceObserver is IPriceObserverDef {
    function getProductResult(address productAddr)
        external
        view
        returns (DeltaVaultResultStatus, uint256 period, uint256 endPrice);
    function registerProduct(ProductInfo calldata productInfo) external;
}
