// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import {DeltaVaultProduct} from "src/DeltaVaultProduct.sol";
import {DeltaVaultFactory} from "src/DeltaVaultFactory.sol";
import {PriceObserver} from "src/PriceObserver.sol";
import {USDe} from "src/mock/USDe.sol";
import {WBTC} from "src/mock/WBTC.sol";
import {AggregatorMock} from "src/mock/Aggregator.sol";
import "src/interfaces/IStructDef.sol";

contract Deploy is Script, IStructDef {
    function deploy() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        address owner = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        DeltaVaultProduct DeltaVaultImpl = new DeltaVaultProduct();
        DeltaVaultFactory factory = new DeltaVaultFactory(owner);

        factory.setImplementation(address(DeltaVaultImpl));

        USDe usd = new USDe();
        WBTC wbtc = new WBTC();

        vm.stopBroadcast();

        deployObserver();

        console2.log("factory: ", address(factory), "\n  DeltaVault impl: ", address(DeltaVaultImpl));
        console2.log("usd:", address(usd));
        console2.log("wbtc: ", address(wbtc));
    }

    function deployMockPriceFeed() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        // for mock, observe every 5 minutes
        AggregatorMock ag = new AggregatorMock();

        console2.log("aggregator: ", address(ag));

        vm.stopBroadcast();
    }

    function setAnswer() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        AggregatorMock ag = AggregatorMock(0xe44a0B926f6CC5a56af17468F66D84DA0dE413bb);

        ag.setAnswer(3900000000000);

        vm.stopBroadcast();
    }

    function deployObserver() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        // for mock, observe every 5 minutes
        PriceObserver observer = new PriceObserver(300, 1701993600);

        console2.log("observer: ", address(observer));

        vm.stopBroadcast();
    }

    function deployProductImpl() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        DeltaVaultProduct DeltaVaultImpl = new DeltaVaultProduct();
        DeltaVaultFactory factory = DeltaVaultFactory(0xbD5a8C111E60867D07D73fcDEd680689D401E2D7);

        factory.setImplementation(address(DeltaVaultImpl));

        vm.stopBroadcast();

        console2.log("factory: ", address(factory), "\n  DeltaVault impl: ", address(DeltaVaultImpl));
    }

    function createWBTCProduct() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        DeltaVaultFactory factory = DeltaVaultFactory(0xbD5a8C111E60867D07D73fcDEd680689D401E2D7);

        // create wbtc product
        address product = factory.createProduct(
            ProductInitArgs(
                0x3d56dC8D257Db1085fD4f47F7fCCeCE279FB330b,
                0xe44a0B926f6CC5a56af17468F66D84DA0dE413bb,
                4400000000000,
                4000000000000,
                4800000000000,
                1702228200,
                900,
                1000,
                0x42EFBA52668d124e8c7427aA7cb2c4Fe7212109A,
                0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0,
                0xbD2F7657535c2896A930F778e8f5468394522312
            )
        );

        vm.stopBroadcast();

        console2.log("factory: ", address(factory));
        console2.log("wbtc product: ", product);
    }

    function buyWBTCShare() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        DeltaVaultProduct product = DeltaVaultProduct(0xEFc5102aD2e5F763020A0A808261E27B8B257B89);
        USDe usd = USDe(0x42EFBA52668d124e8c7427aA7cb2c4Fe7212109A);

        usd.approve(address(product), UINT256_MAX);
        product.buyShare(10 ether);

        vm.stopBroadcast();
    }
}
