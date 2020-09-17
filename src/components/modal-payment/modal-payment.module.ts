import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { ModalPaymentComponent } from 'src/components/modal-payment/modal-payment.component';
import { ModalPaymentStatusComponent } from 'src/components/modal-payment-status/modal-payment-status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatBadgeModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [ModalPaymentComponent, ModalPaymentStatusComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatBadgeModule,
        MatDialogModule,
        ReactiveFormsModule,
        CurrencyMaskModule,
        AngularSvgIconModule.forRoot() 
    ],
    providers: [HttpClient],
    bootstrap: [ModalPaymentComponent],
    entryComponents: [ModalPaymentStatusComponent],
})
export class ModalPaymentModule {}
