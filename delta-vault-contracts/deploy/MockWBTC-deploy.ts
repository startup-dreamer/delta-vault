import { ethers } from 'hardhat';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

async function main() {
    // Get the deployer's address
    const [deployer] = await ethers.getSigners();
    
    const MockWBTC = await ethers.getContractFactory('WBTC');
    const mockWbtc = await MockWBTC.deploy();

    await mockWbtc.deployed();
    console.log(
        `MockWBTC deployed to: ${mockWbtc.address}`
    );

    const tx = await mockWbtc.mint("0x78F1900FFffEAf750A2e13fB926a68cc110c31B7", ethers.utils.parseUnits('1000000', 8));
    await tx.wait();
    console.log('Minted WBTC to deployer');

    return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});