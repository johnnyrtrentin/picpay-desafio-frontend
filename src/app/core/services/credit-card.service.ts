import { Injectable } from '@angular/core';

import { CreditCard } from '@core/model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor() { }

  getCards(): CreditCard[] {
    return [
      // valid card
      {
        card_number: '1111111111111111',
        cvv: 789,
        expiry_date: '01/18',
      },
      // invalid card
      {
        card_number: '4111111111111234',
        cvv: 123,
        expiry_date: '01/20',
      },
    ];
  }

  checkCreditCard(cardNumber: string): boolean {
    return cardNumber !== '4111111111111234';
  }
}
