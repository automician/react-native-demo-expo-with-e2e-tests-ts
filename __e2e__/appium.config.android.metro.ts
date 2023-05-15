import { RemoteOptions } from 'webdriverio'
import { config as baseAndroid } from './appium.config.android'

/* Just an alias to base android config;) */
export const config: RemoteOptions = {
  ...baseAndroid,
  capabilities: {
    ...baseAndroid.capabilities,
  },
}
