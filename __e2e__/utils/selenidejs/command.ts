import { Element, perform } from 'selenidejs'
import { lambda } from 'selenidejs/built/utils' // TODO: refactor to not use import from .../built/...

const longPressWithDuration = (value: number) =>
  lambda('longPress', async (element: Element) => {
    const driver = element.configuration.driver
    const actions = driver?.actions({ async: true })
    const webElement = await element.getWebElement()

    await actions
      ?.move({ origin: webElement })
      .press()
      .pause(value, actions.mouse())
      .release()
      .perform()
  })

const tap = lambda('tap', async (element: Element) => {
  await element.click()
})

export const command = {
  ...perform,
  longPressWithDuration,
  longPress: longPressWithDuration(1000),
  tap,
}
