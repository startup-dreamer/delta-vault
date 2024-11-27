import { ethers } from 'hardhat';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

async function main() {
    // Get the deployer's address
    const [deployer] = await ethers.getSigners();
    
    const PriceObserver = await ethers.getContractFactory('PriceObserver');
    const priceObserver = await PriceObserver.deploy(
        300,
        Math.floor(Date.now() / 1000),
        "0x2880aB155794e7179c9eE2e38200202908C17B43"
    );

    await priceObserver.deployed();
    console.log(
        `PriceObserver deployed to: ${priceObserver.address}`
    );
    return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});