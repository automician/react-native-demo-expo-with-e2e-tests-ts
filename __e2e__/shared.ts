/* eslint-disable @typescript-eslint/no-explicit-any */
import * as wdio from 'webdriverio'
import { Configuration, Wait } from 'selenidejs'
import { WebDriver } from 'selenium-webdriver'
import { selector } from './utils/selenidejs/selector'
import { handlers } from './utils/reflect'
import { By } from 'selenium-webdriver'
import { Browser } from 'selenidejs'
import { SkippedWebElementLocator } from './utils/selenidejs/locators'

interface SharedDrivers {
  wdioDriver: wdio.Browser
  sehqDriver: WebDriver
}

/**
 * Actual drivers will be init outside of tests context by Jest setup,
 * and passed to tests as globals.
 * So here goes shared.* helper-getters so we can access shared drivers from tests.
 */
export const shared: SharedDrivers = {
  get wdioDriver(): wdio.Browser {
    return globalThis['wdioDriver'] as wdio.Browser
  },
  get sehqDriver(): WebDriver {
    return globalThis['sehqDriver'] as WebDriver
  },
}

export const browse = Browser.configuredWith()
  .driver(() => shared.sehqDriver)
  ._locationStrategy(selector.toMobileBy)
  .timeout(5000)
  .build()

export function $(
  located:
    | string
    | By
    | boolean
    | {
        script: string | ((document: Document) => HTMLElement)
        args?: any[]
      },
  customized?: Partial<Configuration>,
): Selenide.Element {
  if (typeof located === 'boolean') {
    // when somebody passed `false` to $(HERE)
    // then patch all element.* commands to do nothing or return false
    const element = browse.element(
      new SkippedWebElementLocator(),
      customized,
    ) as Selenide.Element
    Reflect.set(
      element,
      'wait',
      new Proxy(
        { toString: () => 'SkippedWait' },
        handlers.forwardAllGetPropsToNothing,
      ) as Wait<Selenide.Element>,
    )
    Reflect.set(element, 'matching', async function (...args: any[]) {
      return false
    })
    return element
  } else {
    return browse.element(located, customized) as Selenide.Element
  }
}

export function $$(
  located:
    | string
    | By
    | {
        script: string
        args?: any[]
      },
  customized?: Partial<Configuration>,
): Selenide.Collection {
  // TODO: support 'boolean' as param similar to $
  return browse.all(located, customized) as Selenide.Collection
}
