import { RemoteOptions } from 'webdriverio'
import { config as base } from './appium.config.base'

export const config: RemoteOptions = {
  ...base,
  capabilities: {
    ...base.capabilities,
    'appium:platformName': 'Android',
    'appium:automationName': 'UiAutomator2',
  },
}
