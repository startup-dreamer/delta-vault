import fs from "fs";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-preprocessor";
import dotenv from 'dotenv';
import { HardhatUserConfig, task } from "hardhat/config";

dotenv.config();

import example from "./tasks/example";

function getRemappings() {
  return fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split("="));
}

task("example", "Example task").setAction(example);

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.23",
      },
      {
        version: "0.8.20",
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.API_KEY ? process.env.API_KEY : '',
        blockNumber: 14390000,
      },
      accounts: {
        count: 50,
      },
    },
    ethena: {
      url: process.env.API_KEY ? process.env.API_KEY : '',
      accounts: process.env.DEPLOYMENT_PRIVATE_KEY
        ? [process.env.DEPLOYMENT_PRIVATE_KEY]
        : [],
      gas: 1000000,
      gasPrice: 2000000000,
    },
    sepolia: {
      url: `https://ethereum-sepolia-rpc.publicnode.com`, // Replace with the actual URL of the sepoli network
      accounts: process.env.DEPLOYMENT_PRIVATE_KEY
        ? [process.env.DEPLOYMENT_PRIVATE_KEY]
        : [],
    },
    arbitrum: {
      url: `https://endpoints.omniatech.io/v1/arbitrum/sepolia/public`,
      accounts: process.env.DEPLOYMENT_PRIVATE_KEY
        ? [process.env.DEPLOYMENT_PRIVATE_KEY]
        : [],
    },
  },
  paths: {
    sources: "./src", // Use ./src rather than ./contracts as Hardhat expects
    cache: "./cache_hardhat", // Use a different cache for Hardhat than Foundry
  },
  // This fully resolves paths for imports in the ./lib directory for Hardhat
  preprocess: {
    eachLine: (hre) => ({
      transform: (line: string) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match(find)) {
              line = line.replace(find, replace);
            }
          });
        }
        return line;
      },
    }),
  },
};

export default config;
