import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalPaymentComponent } from 'src/components/modal-payment/modal-payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatBadgeModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@NgModule({
    declarations: [ModalPaymentComponent, SpinnerComponent, HttpClient],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatBadgeModule,
        MatDialogModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
    ],
    providers: [HttpClient],
    bootstrap: [ModalPaymentComponent],
})
export class ModalPaymentModule {}
