import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';

import {
  ITransactionsModel,
  TransactionsStateModel,
} from '../models/transactions.interface';
import { SetTransaction } from './transactions.action';

@State<TransactionsStateModel>({
  name: 'transactions',
  defaults: {
    transactions: [],
  },
})
@Injectable()
export class TransactionsState {
  @Selector()
  static getAllTransactions(
    state: TransactionsStateModel
  ): ITransactionsModel[] {
    return state.transactions;
  }

  @Action(SetTransaction)
  setNewTransaction(
    { setState }: StateContext<TransactionsStateModel>,
    { paymentUser, paymentValue }: SetTransaction
  ): void {
    setState(
      patch<TransactionsStateModel>({
        transactions: append<ITransactionsModel>([
          { paymentValue, paymentUser }
        ]),
      })
    );
  }
}
