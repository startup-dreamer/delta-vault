import dotenv from 'dotenv'
import { Keeper } from './services/keeper'
import { Logger } from './utils/logger'
import { KeeperConfig } from './types/contracts'

dotenv.config()

const config: KeeperConfig = {
  rpcUrl: process.env.RPC_URL!,
  privateKey: process.env.PRIVATE_KEY!,
  hedgeExecutorAddress: process.env.HEDGE_EXECUTOR_ADDRESS!,
  priceObserverAddress: process.env.PRICE_OBSERVER_ADDRESS!,
  checkInterval: parseInt(process.env.CHECK_INTERVAL_MS!) || 60000 // Default 1 minute
}

const logger = new Logger()
const keeper = new Keeper(config, logger)

keeper.start()
  .then(() => logger.info('Keeper service started successfully'))
  .catch(error => {
    logger.error('Failed to start keeper service:', error)
    process.exit(1)
  }) 