import { ethers } from 'hardhat';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

async function main() {
    // Get the deployer's address
    const [deployer] = await ethers.getSigners();

    const DeltaVaultFactory = await ethers.getContractFactory('DeltaVaultFactory');
    const deltaVaultFactory = await DeltaVaultFactory.deploy(
        deployer.address
    );

    await deltaVaultFactory.deployed();
    console.log(
        `DeltaVaultFactory deployed to: ${deltaVaultFactory.address}`
    );

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Set the implementation to the DeltaVaultProduct contract
    /* Sepolia testnet */
    // const deltaVaultProduct = "0x5879F64FA3Ee6B890498de35AEf7b4985468b327";
    // const wbtcAddress = "0x6d6a4678E7755c17ffe0E65211F80D4756d284b5";
    // const usdeAddress = "0x07ece4D758534FE8F8765c0f290b7a5d45dDDF30";
    // const priceObserverAddress = "0xaC6bEAedA40B7D9333e87b39F9Ac68B58B9c89d4";
    // const pythOracleAddress = "0xDd24F84d36BF92C65F92307595335bdFab5Bbd21";
    // const targetTokenPythId = "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43";
    // const usdPythId = "0x6ec879b1e9963de5ee97e9c8710b742d6228252a5e2ca12d4ae81d7fe5ee8c5d";


    /* Ethtena testnet */
    const deltaVaultProduct = "0xc275B3380d68591eAacBe6d4F5BEc2C6948Ab24E";
    const wbtcAddress = "0xA64D3f740757F36A8f1b62D9E25984C66860a062";
    const usdeAddress = "0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE";
    const priceObserverAddress = "0x9e226545857211a8843F823173D5b631d01c1B85";
    const pythOracleAddress = "0x2880aB155794e7179c9eE2e38200202908C17B43";
    const targetTokenPythId = "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43";
    const usdPythId = "0x6ec879b1e9963de5ee97e9c8710b742d6228252a5e2ca12d4ae81d7fe5ee8c5d";

    const currentOwner = await deltaVaultFactory.owner({ 
        gasLimit: 100000 // Increase gas limit to 100k
    });
    const signer = await ethers.getSigner(deployer.address); // Fixed: Added address parameter
    console.log("Current owner:", currentOwner);
    console.log("Signer address:", signer.address);
    
    if (currentOwner.toLowerCase() !== signer.address.toLowerCase()) {
        throw new Error("Signer is not the owner of the contract");
    }

    let tx = await deltaVaultFactory.setImplementation(deltaVaultProduct);

    await tx.wait();

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(
        `DeltaVaultFactory implementation set to: ${deltaVaultProduct}`
    );

    // create WBTC snowball product
    tx = await deltaVaultFactory.createProduct({
        targetToken: wbtcAddress,        // Address of deployed WBTC contract
        targetTokenPythId: targetTokenPythId, // Pyth BTC/USD price feed ID
        targetInitPrice: ethers.utils.parseUnits("95000", 8),  // Initial BTC price ($95,000) with 8 decimals
        targetKnockInPrice: ethers.utils.parseUnits("85000", 8),  // Knock-in price ($85,000) with 8 decimals
        targetKnockOutPrice: ethers.utils.parseUnits("105000", 8), // Knock-out price ($105,000) with 8 decimals
        startTime: Math.floor(Date.now() / 1000) + 3600,    // Start time (1 hour from now)
        period: 28 * 24 * 3600,                             // Period (28 days in seconds)
        baseProfit: 1000,                                   // 10% base profit (10000 = 100%)
        usdToken: usdeAddress,           // Address of USDe contract
        usdPythId: usdPythId, // Pyth USDe price feed ID
        priceObserver: priceObserverAddress,  // Address of deployed PriceObserver contract
        pythAddress: pythOracleAddress        // Address of Pyth oracle contract
    });

    await tx.wait();

    console.log(
        `WBTC Snowball product created`
    );

    return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});