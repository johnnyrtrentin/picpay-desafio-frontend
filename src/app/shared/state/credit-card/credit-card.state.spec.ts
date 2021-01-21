import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { CreditCardState } from './credit-card.state';

describe('CreditCardState', () => {
  let store: Store;
  const defaultCreditCardState = {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CreditCardState])],
    });

    store = TestBed.get(Store);
  });

  it('should have default values for state', () => {
    const creditCardState = store.selectSnapshot((state) => state.cards);
    expect(creditCardState).toBeTruthy();
    expect(creditCardState).toEqual(defaultCreditCardState);
  });

  it('should selector return the state values', () => {
    const getCreditCardsSelector = store.selectSnapshot(CreditCardState.getAllCreditCards);
    expect(getCreditCardsSelector).toEqual([...defaultCreditCardState.cards]);
  });
});
