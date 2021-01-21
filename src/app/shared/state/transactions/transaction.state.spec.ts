import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TransactionsState } from './transaction.state';

import * as transactionMock from '../../../core/mocks/transaction.mock';
import { SetTransaction } from './transactions.action';

describe('TransactionState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TransactionsState])],
    });

    store = TestBed.get(Store);
  });

  it('should return empty default state value', () => {
    const transactionState = store.selectSnapshot(
      (state) => state.transactions
    );
    expect(transactionState).toBeTruthy();
    expect(transactionState).toEqual(transactionMock.defaultState);
  });

  it('should set a new transaction', () => {
    store.dispatch(new SetTransaction(
        transactionMock.dispatchValues[0].paymentValue,
        transactionMock.dispatchValues[0].paymentUser
    ));
    store.dispatch(new SetTransaction(
        transactionMock.dispatchValues[1].paymentValue,
        transactionMock.dispatchValues[1].paymentUser
    ));
    store.dispatch(new SetTransaction(
        transactionMock.dispatchValues[2].paymentValue,
        transactionMock.dispatchValues[2].paymentUser
    ));

    const transactionState = store.selectSnapshot((state) => state.transactions);
    expect(transactionState).toBeTruthy();
    expect(transactionState).toEqual(transactionMock.stateWithDispatchedValues);
  });

  it('should selector return all the transactions', () => {
    store.dispatch(new SetTransaction(
        transactionMock.dispatchValues[0].paymentValue,
        transactionMock.dispatchValues[0].paymentUser
    ));
    store.dispatch(new SetTransaction(
        transactionMock.dispatchValues[1].paymentValue,
        transactionMock.dispatchValues[1].paymentUser
    ));
    store.dispatch(new SetTransaction(
        transactionMock.dispatchValues[2].paymentValue,
        transactionMock.dispatchValues[2].paymentUser
    ));

    const getTransactionsSelector = store.selectSnapshot(TransactionsState.getAllTransactions);
    expect(getTransactionsSelector).toBeTruthy();
    expect(getTransactionsSelector).toEqual([...transactionMock.stateWithDispatchedValues.transactions]);
  });
});
