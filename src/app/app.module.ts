import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalPaymentComponent } from 'src/components/modal-payment/modal-payment.component';
import { ModalPaymentStatusComponent } from 'src/components/modal-payment-status/modal-payment-status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule, MatDialogModule } from '@angular/material';
@NgModule({
    declarations: [AppComponent, ModalPaymentComponent, ModalPaymentStatusComponent],
    imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, MatBadgeModule, MatDialogModule],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [ModalPaymentComponent, ModalPaymentStatusComponent],
})
export class AppModule {}
