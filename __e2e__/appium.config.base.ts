import { RemoteOptions } from 'webdriverio'

export const config: RemoteOptions = {
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
  capabilities: {
    'appium:newCommandTimeout': 1000,
  },
  waitforTimeout: 100000,
  connectionRetryCount: 3,
  logLevel: 'info',
}
