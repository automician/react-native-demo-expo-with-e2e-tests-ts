import { Element, be } from 'selenidejs'
import { command } from './command'

Element.prototype.longPress = function ({ duration } = { duration: 1000 }) {
  return this.perform(command.longPressWithDuration(duration))
}

Element.prototype.tap = function () {
  return this.perform(command.tap)
}

/**
 * Making Element a thenable object,
 * allowing to check element presense by simply awaiting it.
 */
Element.prototype.then = function (onfulfilled) {
  /**
   * It's pretty attracting to implement it via waitUntil,
  return this.with({ timeout: 0 })
    .waitUntil(be.visible)
    .then((res) => (res ? onfulfilled(true) : onfulfilled(false)));
   * kind of prompting to understanding
   * that `await element` will wait for element to be visible not just check
   * ant probably something like this can also be possible
   * `await element.with({ timeout: 1000})`
   * but in order to make the latter work, we have to implement this `then` method as
  return this
    .waitUntil(be.visible)
    .then((res) => (res ? onfulfilled(true) : onfulfilled(false)));
   * but then by default it will wait for default configuration.timeout
   * that is not what we want in most cases... And so we would have to write in most cases:
   * `await element.with({ timeout: 0})` that is not much better than `await element.matching(be.visible))`
   * this is why we implement it via matching, and this mean that
   * `await element.with({ timeout: 1000})` will not work, you have to explicitely call
   * `await element.with({ timeout: 1000}).waitUntil(be.visible)`
   * that is probably a good thing, because if have a variable with already post-tuned timeout
   * `element = element.with({ timeout: 1000})`,
   * then when you call `await element`
   * it will not be obvious that there will be some additional timeout...
   */

  return this.matching(be.visible).then(res =>
    res ? onfulfilled(true) : onfulfilled(false),
  )
}
