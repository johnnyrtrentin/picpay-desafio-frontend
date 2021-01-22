import { ElementFinder } from 'protractor';
import { UserPaymentPage } from '../pages/user-payment.po';

describe('Payment Suite Test', () => {
  const userPaymentPage = new UserPaymentPage();

  beforeAll(() => {
    userPaymentPage.goToTransactionPage();
  });

  it('should select one user in list', () => {
    const firstUser = userPaymentPage.findElementByCss('.mat-list-item-content');

    userPaymentPage.waitElementToBeClickable(firstUser).then(() => {
      firstUser.click();
    });

    const pageLoading = userPaymentPage.findElementByCss('.spinner');

    userPaymentPage.waitElementToDisappear(pageLoading).then(() => {
      const userSelected = userPaymentPage.findElementByTagName('b', true);
      expect(userSelected).toBeTruthy();
      expect(userSelected).toBe('Eduardo Santos');
    });
  });

  it('should can insert user and credit card values', () => {
    const paymentField = userPaymentPage.findElementByCss('input[formControlName="paymentValue"]');

    userPaymentPage.sendInputValue(paymentField, 150);
    userPaymentPage.elementClick(paymentField);

    const creditCardField = userPaymentPage.findElementByCss('mat-select[formControlName="paymentCreditCard"]');

    userPaymentPage.waitElementToBeClickable(creditCardField).then(() => {
      userPaymentPage.elementClick(creditCardField);
    });

    const validCreditCard = userPaymentPage.findElementById('mat-option-1');
    userPaymentPage.elementClick(validCreditCard);

    expect(userPaymentPage.getValueByAttribute(paymentField)).toBe('R$ 1,50');
    expect(userPaymentPage.getValueByText(creditCardField)).toBe('Cartão final: 1111');
  });

  it('should do payment', () => {
    const doPaymentButton = userPaymentPage.findElementByCss('.mat-raised-button');

    userPaymentPage.waitElementToBeEnabled(doPaymentButton).then(() => {
      userPaymentPage.elementClick(doPaymentButton);
    });
  });

  it('should display success toaster', () => {
    const snackBar = userPaymentPage.findElementByTagName('simple-snack-bar') as ElementFinder;

    userPaymentPage.waitForElementToBePresentOnDOM(snackBar).then(() => {
      userPaymentPage.getValueByText(snackBar).then((message) => {
        expect(message).toContain('Transação efetuada com sucesso.');
        userPaymentPage.elementClick(snackBar);
      });
    });
  });
});
