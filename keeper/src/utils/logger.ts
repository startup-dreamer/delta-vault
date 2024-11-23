export class Logger {
  debug(message: string, ...args: any[]): void {
    console.debug(`[DEBUG] ${message}`, ...args)
  }

  info(message: string, ...args: any[]): void {
    console.info(`[INFO] ${message}`, ...args)
  }

  error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args)
  }
} 