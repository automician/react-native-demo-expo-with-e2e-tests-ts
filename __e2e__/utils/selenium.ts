import * as wdio from 'webdriverio'
import * as sehq from 'selenium-webdriver'
import { HttpClient, Executor } from 'selenium-webdriver/http'

export const sehqDriver = {
  fromWdio(driver: wdio.Browser, config: wdio.RemoteOptions): sehq.WebDriver {
    const { hostname, port, path } = config
    const client = new HttpClient(`http://${hostname}:${port}${path}`)
    const executor = new Executor(client)

    return new sehq.WebDriver(
      new sehq.Session(driver.sessionId, driver.capabilities || {}),
      executor,
    )
  },
}
