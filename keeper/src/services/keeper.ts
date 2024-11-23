import { BaseUpkeep } from '../contracts/baseUpkeep'
import { ContractInitializer } from '../contracts/contractInitializer'
import { KeeperConfig, UpkeepContract } from '../types/contracts'
import { Logger } from '../utils/logger'

export class Keeper extends BaseUpkeep {
  private contracts: UpkeepContract[]
  private checkInterval: number

  constructor(config: KeeperConfig, logger: Logger) {
    super(config.rpcUrl, config.privateKey, logger)
    
    const { hedgeExecutor, priceObserver } = ContractInitializer.initializeContracts(
      this.wallet,
      config.hedgeExecutorAddress,
      config.priceObserverAddress
    )
    
    this.contracts = [hedgeExecutor, priceObserver]
    this.checkInterval = config.checkInterval
  }

  public async start(): Promise<void> {
    this.logger.info('Starting keeper service...')
    
    // Initial check
    await this.checkAllContracts()
    
    // Set up interval
    setInterval(async () => {
      await this.checkAllContracts()
    }, this.checkInterval)
  }

  private async checkAllContracts(): Promise<void> {
    // Execute all upkeeps concurrently
    await Promise.all(
      this.contracts.map(contract => this.performUpkeepIfNeeded(contract))
    )
  }
} 