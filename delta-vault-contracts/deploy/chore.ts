import { ethers } from 'hardhat';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

async function main() {
    // Get the deployer's address
    const [deployer] = await ethers.getSigners();

    // Get the PriceObserver contract at deployed address
    const priceObserver = await ethers.getContractAt(
        'WBTC',
        '0xb5644ce4222542B314E8F802c55ce80f568DE0c0'
    );

    const test = await priceObserver.mint(deployer.address, ethers.utils.parseUnits('1000000', 8));
    await test.wait();
    console.log('test', test);
    // Add a keeper
    // await priceObserver.addKeeper(deployer.address);
    // console.log('Added keeper:', deployer.address);

    // // // Check upkeep
    // // const [upkeepNeeded, performData] = await priceObserver.checkUpkeep('0x');
    // // console.log('Upkeep needed:', upkeepNeeded);

    // // // Perform upkeep if needed
    // // if (upkeepNeeded) {
    // //     await priceObserver.performUpkeep('0x');
    // //     console.log('Performed upkeep');
    // // }

    // // Get product result for a specific product
    // const productAddr = '0x730acA240aFA93E7F297a8860fcb9D3a6DB23669'; // Replace with actual product address
    // await priceObserver.registerProduct({
    //     targetTokenPythId: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    //     targetInitPrice: ethers.utils.parseUnits("95000", 8),
    //     targetKnockInPrice: ethers.utils.parseUnits("85000", 8),
    //     targetKnockOutPrice: ethers.utils.parseUnits("105000", 8),
    //     startTime: Math.floor(Date.now() / 1000) + 3600,
    //     period: 30 * 24 * 3600,
    //     baseProfit: 1000
    // });
    // const [status, period, endPrice] = await priceObserver.getProductResult(productAddr);
    // console.log('Product status:', status);
    // console.log('Period:', period.toString());
    // console.log('End price:', endPrice.toString());

    return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});