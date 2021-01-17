import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CreditCardStateModel } from '../models/credit-card.interface';

@State<CreditCardStateModel>({
  name: 'cards',
  defaults: {
    cards: [
      {
        card_number: '4111111111111234',
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
