import { WebElement } from 'selenium-webdriver';
import { Locator } from 'selenidejs/built/locators/locator';
import { handlers } from '../../utils/reflect';

export class SkippedWebElementLocator implements Locator<Promise<WebElement>> {
  async find(): Promise<WebElement> {
    const dummy = { toString: () => 'SkippedWebElement' };
    return new Proxy(dummy, handlers.forwardAllGetPropsToNothing) as WebElement;
  }
  toString(): string {
    return 'ElementThatIgnoresEverything';
  }
}
