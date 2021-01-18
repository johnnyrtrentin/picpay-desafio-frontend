export class CreditCardHelper {
  static checkCreditcard(cardNumber: string): boolean {
    const finalCardNumbers = cardNumber.slice(12, 16);
    if (finalCardNumbers === '1234') {
      return false;
    } else {
      return true;
    }
  }
}
