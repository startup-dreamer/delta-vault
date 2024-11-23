import { Contract, Wallet, providers } from 'ethers'
import { Logger } from '../utils/logger'
import { UpkeepContract } from '../types/contracts'

export abstract class BaseUpkeep {
  protected wallet: Wallet
  protected provider: providers.JsonRpcProvider
  protected logger: Logger

  constructor(
    rpcUrl: string,
    privateKey: string,
    logger: Logger
  ) {
    this.provider = new providers.JsonRpcProvider(rpcUrl)
    this.wallet = new Wallet(privateKey, this.provider)
    this.logger = logger
  }

  protected async performUpkeepIfNeeded(contract: UpkeepContract): Promise<void> {
    try {
      const [needsUpkeep, performData] = await contract.contract.checkUpkeep('0x')
      
      if (needsUpkeep) {
        this.logger.info(`Performing upkeep for ${contract.name}...`)
        const tx = await contract.contract.performUpkeep(performData)
        await tx.wait()
        this.logger.info(`Upkeep completed for ${contract.name}. TX: ${tx.hash}`)
      } else {
        this.logger.debug(`No upkeep needed for ${contract.name}`)
      }
    } catch (error) {
      this.logger.error(`Error in ${contract.name} upkeep:`, error)
    }
  }
} 