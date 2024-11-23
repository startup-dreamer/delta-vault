import { Contract, Wallet } from 'ethers'
import { UpkeepContract } from '../types/contracts'

// ABI snippets for the required functions
const ABI = [
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "checkUpkeep",
    "outputs": [
      {
        "internalType": "bool",
        "name": "upkeepNeeded",
        "type": "bool"
      },
      {
        "internalType": "bytes", 
        "name": "performData",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes" 
      }
    ],
    "name": "performUpkeep",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export class ContractInitializer {
  static initializeContracts(
    wallet: Wallet,
    hedgeExecutorAddress: string,
    priceObserverAddress: string
  ): { hedgeExecutor: UpkeepContract; priceObserver: UpkeepContract } {
    const hedgeExecutor: UpkeepContract = {
      address: hedgeExecutorAddress,
      contract: new Contract(hedgeExecutorAddress, ABI, wallet),
      name: 'HedgeExecutor'
    }

    const priceObserver: UpkeepContract = {
      address: priceObserverAddress,
      contract: new Contract(priceObserverAddress, ABI, wallet),
      name: 'PriceObserver'
    }

    return { hedgeExecutor, priceObserver }
  }
}