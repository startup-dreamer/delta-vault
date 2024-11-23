// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Test} from "forge-std/Test.sol";
import {PriceObserver} from "src/PriceObserver.sol";
import {DeltaVaultFactory} from "src/DeltaVaultFactory.sol";
import {DeltaVaultProduct} from "src/DeltaVaultProduct.sol";
import {USDe} from "src/mock/USDe.sol";
import {WBTC} from "src/mock/WBTC.sol";
import {AggregatorMock} from "src/mock/Aggregator.sol";

contract BaseTest is Test {
    DeltaVaultFactory internal _factory;
    address internal _impl;
    PriceObserver internal _observer;

    address internal _admin = makeAddr("admin");
    address internal _user = makeAddr("user");
    address internal _wbtc = address(new WBTC());
    address internal _usd = address(new USDe());
    AggregatorMock internal _wbtcFeeData = new AggregatorMock();
    AggregatorMock internal _usdFeeData = new AggregatorMock();

    function setUp() public virtual {
        _factory = new DeltaVaultFactory(_admin);
        _impl = address(new DeltaVaultProduct());
        // observe every day, observe on utc+0
        _observer = new PriceObserver(1 days, 0);

        // set implementation
        vm.prank(_admin);
        _factory.setImplementation(_impl);
    }
}
