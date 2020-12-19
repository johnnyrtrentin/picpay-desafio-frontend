import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { PaymentTransaction} from './payment-transaction'

export const BASE_API_URL = 'https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog)
  {}

  pay(paymentTransaction: PaymentTransaction) {
    return this.http.post(BASE_API_URL, paymentTransaction)
      .pipe(
        take(1),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
