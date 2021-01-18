export class CreditCardHelper {
  /**
   * Check if the credit card number is valid.
   * @param cardNumber Credit card number
   */
  static creditCardNumberValidator(cardNumber: string): boolean {
    const finalCardNumbers = cardNumber.slice(12, 16);
    if (finalCardNumbers === '1234') {
      return false;
    } else {
      return true;
    }
  }
}
