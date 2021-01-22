import { browser, by, element, ElementFinder, promise, ProtractorExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class UserPaymentPage {
  private DEFAULT_TIMEOUT = 5_000;
  private EXTENDED_TIMEOUT = 10_000;

  goToTransactionPage(): void {
    browser.get('/user-payment');
  }

  get EC(): ProtractorExpectedConditions {
    return protractor.ExpectedConditions;
  }

  waitElementToBeClickable(elm: ElementFinder): promise.Promise<any> {
    return browser.wait(this.EC.elementToBeClickable(elm), this.DEFAULT_TIMEOUT).then((value) => {
      return value;
    });
  }

  waitElementToDisappear(elm: ElementFinder): promise.Promise<any> {
    return browser.wait(this.EC.invisibilityOf(elm), this.DEFAULT_TIMEOUT).then(value => {
      return value;
    });
  }

  waitElementToBeInvisible(elm: ElementFinder): promise.Promise<any> {
    return browser.wait(this.EC.invisibilityOf(elm)).then((value) => {
      return value;
    });
  }

  waitForElementToBePresentOnDOM(elm: ElementFinder): promise.Promise<any> {
    return browser.wait(this.EC.presenceOf(elm), this.EXTENDED_TIMEOUT).then((value) => {
      return value;
    });
  }

  waitElementToBeEnabled(elm: ElementFinder): promise.Promise<boolean> {
    return elm.isEnabled();
  }

  findElementByCss(elm: string): ElementFinder {
    return element(by.css(elm));
  }

  findElementById(elm: string): ElementFinder {
    return element(by.id(elm));
  }

  findElementByTagName(elm: string, returnValue?: boolean): ElementFinder | promise.Promise<string> {
    if (returnValue) {
      return element(by.tagName(elm)).getText();
    } else {
      return element(by.tagName(elm));
    }
  }

  sendInputValue(elm: ElementFinder, value: number | string): void {
    elm.clear();
    elm.sendKeys(value);
  }

  elementClick(elm: ElementFinder): void {
    elm.click();
  }

  getValueByAttribute(elm: ElementFinder): promise.Promise<string> {
    return elm.getAttribute('value');
  }

  getValueByText(elm: ElementFinder): promise.Promise<string> {
    return elm.getText();
  }
}
