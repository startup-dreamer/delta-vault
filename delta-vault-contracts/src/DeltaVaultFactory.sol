// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Ownable} from "solady/auth/Ownable.sol";
import "solady/utils/LibClone.sol";
import {IDeltaVaultProduct} from "src/interfaces/IDeltaVaultProduct.sol";
import {IStructDef} from "src/interfaces/IStructDef.sol";

contract DeltaVaultFactory is Ownable, IStructDef {
    event ProductCreate(address);

    address internal _impl;

    constructor(address owner_) {
        _initializeOwner(owner_);
    }

    function createProduct(ProductInitArgs calldata args) public returns (address) {
        // clone and initialize
        address product = LibClone.clone(_impl);
        IDeltaVaultProduct(product).initialize(args);

        emit ProductCreate(product);

        return product;
    }

    function setImplementation(address impl) public onlyOwner {
        _impl = impl;
    }
}
