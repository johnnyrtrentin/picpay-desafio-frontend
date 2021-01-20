import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';
import { CreditCardStateModel } from '../models/credit-card.interface';

@State<CreditCardStateModel>({
  name: 'cards',
  defaults: {
    cards: [
      {
        card_number: '4111111111111234',
        cvv: 123,
        expiry_date: '01/20',
      },
      {
        card_number: '4111111111111111',
        cvv: 789,
        expiry_date: '01/18',
      },
    ],
  },
})
@Injectable()
export class CreditCardState {

  @Selector()
  static getAllCreditCards(state: CreditCardStateModel) {
    return state.cards;
  }
}
