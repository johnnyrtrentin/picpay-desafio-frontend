import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { AppComponent } from './app.component';
import { ModalPaymentComponent } from 'src/components/modal-payment/modal-payment.component';
import { ModalPaymentStatusComponent } from 'src/components/modal-payment-status/modal-payment-status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};
 
@NgModule({
    declarations: [AppComponent, ModalPaymentComponent, ModalPaymentStatusComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatBadgeModule,
        MatDialogModule,
        ReactiveFormsModule,
        CurrencyMaskModule,
    ],
    providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
    bootstrap: [AppComponent],
    entryComponents: [ModalPaymentComponent, ModalPaymentStatusComponent],
})
export class AppModule {}
