import { ethers } from 'hardhat';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

async function main() {
    // Get the deployer's address
    const [deployer] = await ethers.getSigners();
    
    const MockUSDe = await ethers.getContractFactory('USDe');
    const mockUsde = await MockUSDe.deploy();

    await mockUsde.deployed();
    console.log(
        `MockUSDe deployed to: ${mockUsde.address}`
    );

    const tx = await mockUsde.mint(deployer.address, ethers.utils.parseUnits('1000000', 18));
    await tx.wait();

    console.log('Minted USDe to deployer');

    return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});