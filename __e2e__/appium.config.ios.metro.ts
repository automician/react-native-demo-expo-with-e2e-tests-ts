import { RemoteOptions } from 'webdriverio'
import * as path from 'path'
import appConfig from '../app.config'
import { config as baseIOS } from './appium.config.ios'

/* Just an alias to base android config;) */
export const config: RemoteOptions = {
  ...baseIOS,
  capabilities: {
    ...baseIOS.capabilities,
  },
}
