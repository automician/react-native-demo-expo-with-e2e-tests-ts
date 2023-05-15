/* eslint-disable @typescript-eslint/no-empty-interface */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as selenide from 'selenidejs'

declare global {
  // TODO: consider moving this to selenidejs library
  namespace Selenide {
    interface Element extends selenide.Element {}
    interface Collection extends selenide.Collection {}
    interface Browser extends selenide.Browser {}
    interface Configuration extends selenide.Configuration {}
    interface ElementCondition extends selenide.ElementCondition {}
  }
  var ios: boolean
  var drd: boolean
  var wdioDriver: import('webdriverio').Browser
  var sehqDriver: import('selenium-webdriver').WebDriver
}
