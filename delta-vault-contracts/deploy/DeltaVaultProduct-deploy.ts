import { ethers } from 'hardhat';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    // Get the deployer's address
    const [deployer] = await ethers.getSigners();
    
    const DeltaVaultProduct = await ethers.getContractFactory('DeltaVaultProduct');
    const deltaVaultProduct = await DeltaVaultProduct.deploy();

    await deltaVaultProduct.deployed();
    console.log(
        `DeltaVaultProduct deployed to: ${deltaVaultProduct.address}`
    );
    return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});