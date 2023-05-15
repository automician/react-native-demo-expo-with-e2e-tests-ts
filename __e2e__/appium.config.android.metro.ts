import { RemoteOptions } from 'webdriverio'
import * as path from 'path'
import appConfig from '../app.config'
import { config as baseAndroid } from './appium.config.android'

/* Just an alias to base android config;) */
export const config: RemoteOptions = {
  ...baseAndroid,
  capabilities: {
    ...baseAndroid.capabilities,
  },
}
