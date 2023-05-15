import { shared, $ } from './shared'
import { beforeEach } from '@jest/globals'
import config from '../app.config'
import { be } from 'selenidejs'
import { AppState } from './utils/appium'
import { testPlatform } from './utils/platform'

// TODO: can we reload app via Metro bundler remotely?
// via adb: https://stackoverflow.com/a/55245508/1297371
// + `adb shell input keyevent KEYCODE_MENU` to open dev menu
// at least we can open dev menu and press "Reload" via appium

beforeEach(async () => {
  const appId = testPlatform.isAndroid
    ? config.android.package
    : config.ios.bundleIdentifier
  const appState = await shared.wdioDriver.queryAppState(appId)
  let wasActivated = false

  switch (appState) {
    case AppState.IsNotInstalled:
      // await shared.wdioDriver.installApp(path.resolve('./builds/android-sim.apk'));
      throw new Error('App is not installed, install app via Metro bundler')
    case AppState.IsNotRunning:
      /**
       * calling .launchApp() will not work, because requires appPackage and appActivity capabilities
      await shared.wdioDriver.launchApp();
       * but if we add them to appium config, then appium will relaunch app on first test
       * hence, we can just use .activateApp(config.android.package) instead
       */
      await shared.wdioDriver.activateApp(appId)
      wasActivated = true
      ;(await $(drd && 'DevLauncherMainScreen')
        .with({ timeout: 1000 })
        .waitUntil(be.visible)) && (await $('text=http').tap())

      break
    case AppState.IsRunningInBackgroundOrSuspended:
    case AppState.IsRunningInBackground:
      await shared.wdioDriver.activateApp(appId)
      wasActivated = true
    case AppState.IsRunningInForeground:
    default:
      // TODO: handle for ios too!
      ;(await $(drd && 'DevLauncherMainScreen')) && (await $('text=http').tap())
      ;(await $('text=Runtime version')) && (await $('"Reload"').tap())

      // TODO: Won't it interfere with other tests were it's ok to start with some Done button? :D
      ;(await $(ios && 'name=Done')) && (await $('name=Done').tap())
    /**
       * TODO: consider the following shortcuts:
      await $('name=Done').with({ condition: be.visible }).tap();
      await $('name=Done').on(be.visible).tap();
      // or
      await $('name=Done').if(be.visible).tap();
       */
  }

  ;(await $(
    'text=Since this is your first time opening this development build',
  )) &&
    (await $('"Got It"').tap()) &&
    (await $('text=Runtime version:')) &&
    (await $('text=http').tap())

  // TODO: will activate reset app to initial state? if no, then we have to reload it still
  //       yet ensuring that 46 event will not press any button:)
  //       maybe, then, reload it via shake + tap on Reload?
  // force app reload
  drd &&
    !wasActivated &&
    (await shared.sehqDriver.executeScript('mobile: shell', {
      command: 'input',
      args: ['keyevent', '46'],
    }))
  // TODO: implement triggering localhost:8081/reload endpoint
  // ios...
  // TODO: how can we reload app via Metro bundler remotely?
  //       do we even need it? can we workaroud it somehow?
})
