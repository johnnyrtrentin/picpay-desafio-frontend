import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { CreditCardState } from './credit-card.state';

import * as stateMock from '../../../core/mocks/state.mock';

describe('CreditCardState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CreditCardState])],
    });

    store = TestBed.get(Store);
  });

  it('should have default values for state', () => {
    const creditCardState = store.selectSnapshot((state) => state.cards);
    expect(creditCardState).toBeTruthy();
    expect(creditCardState).toEqual(stateMock.defaultCreditCardState);
  });

  it('should selector return the state values', () => {
    const getCreditCardsSelector = store.selectSnapshot(CreditCardState.getAllCreditCards);
    expect(getCreditCardsSelector).toEqual([...stateMock.defaultCreditCardState.cards]);
  });
});
