import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngxs/store';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SetTransaction } from '../transactions/transactions.action';
import { ITransactionPayload } from '../models/transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private API_ENDPOINT =
    'https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989';

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  /**
   * Send the data of the transaction to API
   * @param transactionPayload Body for the transaction action
   */
  public makeTransaction(
    transactionPayload: ITransactionPayload
  ): Observable<object> {
    return this.http
      .post(this.API_ENDPOINT, transactionPayload)
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Send the data of the current transaction to the container state
   */
  public userTransactionDispatcher(paymentValue: number, paymentUser: string): void {
    this.store.dispatch(new SetTransaction(paymentValue, paymentUser));
  }
}
