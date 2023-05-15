import NodeEnvironment from 'jest-environment-node'
import type { JestEnvironmentConfig } from '@jest/environment'
import type { EnvironmentContext } from '@jest/environment'
import * as wdio from 'webdriverio'
import * as sehq from 'selenium-webdriver'
import { config as appiumConfig } from './appium.config'
import { sehqDriver } from './utils/selenium'
import { testPlatform } from './utils/platform'

/**
 * See examples in https://jestjs.io/docs/configuration#testenvironment-string
 */
export default class CustomEnvironment extends NodeEnvironment {
  wdioDriver: wdio.Browser | undefined
  sehqDriver: sehq.WebDriver | undefined

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    this.wdioDriver = undefined
    this.sehqDriver = undefined
  }

  async setup() {
    await super.setup()

    this.wdioDriver = await wdio.remote(appiumConfig)
    if (testPlatform.isAndroid) {
      this.wdioDriver.updateSettings({ disableIdLocatorAutocompletion: true })
    }

    this.sehqDriver = sehqDriver.fromWdio(this.wdioDriver, appiumConfig)

    // pass drivers to tests as globals
    this.global.wdioDriver = this.wdioDriver
    this.global.sehqDriver = this.sehqDriver
  }

  async teardown() {
    await this.wdioDriver?.deleteSession()

    await super.teardown()
  }

  getVmContext() {
    return super.getVmContext()
  }

  // async handleTestEvent(event, state) {
  //   if (event.name === 'test_fn_failure') {
  //     // TODO: save/atach screenshot on failure (to some report)
  //   }
  // }
}
