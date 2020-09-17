import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalPaymentComponent } from 'src/components/modal-payment/modal-payment.component';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    environmentUrl = 'Debug api';

    constructor(private httpClient: HttpClient, public matDialog: MatDialog) {}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    };

    getUsers() {
        return this.httpClient
            .get<User[]>(`https://www.mocky.io/v2/5d531c4f2e0000620081ddce`, this.httpOptions)
            .pipe(retry(2), catchError(this.handleError));
    }

    openModal(user: User) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = user;
        dialogConfig.disableClose = true;
        dialogConfig.id = 'modal-component';
        this.matDialog.open(ModalPaymentComponent, dialogConfig);
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
