import { Contract } from 'ethers'

export interface UpkeepContract {
  address: string
  contract: Contract
  name: string
}

export interface KeeperConfig {
  rpcUrl: string
  privateKey: string
  hedgeExecutorAddress: string
  priceObserverAddress: string
  checkInterval: number // milliseconds
} 