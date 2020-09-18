import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Card, User } from 'src/models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root',
})
export class ModalPaymentService {
    environmentUrl = 'Debug api';

    constructor(private httpClient: HttpClient, public matDialog: MatDialog) {}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    };


    sendPayment(
        userId: number,
        value: {
            value: string;
            card: Card;
        }
    ) {
        return this.httpClient
            .post(
                `https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989`,
                {
                    card_number: value.card.card_number,
                    cvv: value.card.cvv,
                    expiry_date: value.card.expiry_date,
                    destination_user_id: userId,
                    value: value.value,
                },
                this.httpOptions
            )
            .pipe(retry(1), catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `status: ${error.status}, ` + `message: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
