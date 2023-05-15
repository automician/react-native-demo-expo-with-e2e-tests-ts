# React Native Demo App(s)

A demo project with React Native and End-to-End tests with SelenideJs + WebdriverIO based Appium implementation.

## Installation

### Pre-requisites (MacOS)

```bash
brew install watchman
sudo gem install cocoapods
```

To run E2E-tests:

```bash
npm install -g appium@next \
&& appium driver install uiautomator2 \
&& appium driver install xcuitest
```

### Install project dependencies

```bash
yarn install --frozen-lockfile
```

## Build & Run in local simulator

### Android

TBD

### IOS

TBD

#### Usefull commands

```bash
# list all simulators
xcrun xctrace list devices
# open simulator
open -a Simulator
# list all available and shutdown iPhone devices
xcrun simctl list | grep '(Shutdown)' | grep iPhone | grep -v unavailable
# open device with name "iPhone 14 Pro" in Simulator
xcrun simctl boot "iPhone 14 Pro"
# unarchive builds/ios.tar.gz into builds/
tar -xvzf builds/ios.tar.gz -C builds/
# install builds/*.app into booted device at simulator
xcrun simctl install booted builds/*.app
# reload ios app in simulator
```

## Run Tests

In parallel terminal:

```bash
appium server --relaxed-security
```

(`--relaxed-security` is required to run adb shell commands)

Then:

### Run tests on opened android simulator with connected metro bundler

```bash
yarn test:e2e:metro:android
```

### Run tests on opened ios simulator with connected metro bundler

```bash
yarn test:e2e:metro:ios
```

### Run tests on android/ios from scratch

TBD

### To inspect elements

Given, Appium Inspector installed from [official releases](https://github.com/appium/appium-inspector/releases),
And opened,
Then ensure Remote Path setting is `/` (not `/wd/hub`!),
And connect to already opened android simulator by starting session with the following capabilities:

#### Android caps

```json
{
  "appium:automationName": "UiAutomator2",
  "appium:platformName": "Android",
  "appium:settings[disableIdLocatorAutocompletion]": true
}
```

#### iOS caps

```json
{
  "appium:automationName": "XCUITest",
  "appium:platformName": "iOS",
  "appium:deviceName": "iPhone 14 Pro",
  "appium:platformVersion": "16.4"
}
```

## E2E Tests TODOs

* separate e2e tsconfig from main tsconfig, and exclude e2e folder from main tsconfig
* make `$$` command support «per platform locators» same as the `$` command
