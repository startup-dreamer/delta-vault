// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IStructDef} from "./IStructDef.sol";

interface IDeltaVaultProductDef {
    error InvalidTokenParams();
    error DeltaVaultStarted();
    error DeltaVaultNotEnded();
    error Claimed();

    event BuyShare(address indexed user, uint256 usdAmount, uint256 targetAmount);
}

interface IDeltaVaultProduct is IDeltaVaultProductDef, IStructDef {
    function initialize(ProductInitArgs calldata args) external;
    function hedge() external;
}
