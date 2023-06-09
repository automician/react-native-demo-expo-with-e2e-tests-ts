import { RemoteOptions } from 'webdriverio'
import { config as base } from './appium.config.base'

export const config: RemoteOptions = {
  ...base,
  capabilities: {
    ...base.capabilities,
    'appium:platformName': 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:platformVersion': '16.4',
    'appium:deviceName': 'iPhone 14 Pro',
  },
}
