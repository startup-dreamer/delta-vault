// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Ownable} from "solady/auth/Ownable.sol";
import "solady/utils/LibClone.sol";
import {IDeltaVaultProduct} from "src/interfaces/IDeltaVaultProduct.sol";
import {IStruct} from "src/interfaces/IStruct.sol";

/// @title DeltaVaultFactory
/// @notice Factory contract for creating new DeltaVault products
contract DeltaVaultFactory is Ownable, IStruct {
    event ProductCreate(address product);

    /// @notice Implementation contract address that will be cloned
    address internal impl;

    constructor(address owner_) {
        _initializeOwner(owner_);
    }

    /// @notice Creates a new DeltaVault product
    /// @param args Initialization arguments for the new product
    /// @return Address of the newly created product
    function createProduct(ProductInitArgs calldata args) public returns (address) {
        require(impl != address(0), "Implementation not set");

        // clone and initialize
        address product = LibClone.clone(impl);
        IDeltaVaultProduct(product).initialize(args);

        emit ProductCreate(product);

        return product;
    }

    /// @notice Sets the implementation contract address
    /// @param _impl New implementation contract address
    /// @dev Can only be called by contract owner
    function setImplementation(address _impl) public onlyOwner {
        require(_impl != address(0), "Invalid implementation address");
        impl = _impl;
    }
}
