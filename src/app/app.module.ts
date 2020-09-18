import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { AppComponent } from './app.component';
import { ModalPaymentComponent } from 'src/components/modal-payment/modal-payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { HeaderComponent } from '../components/header/header.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: false,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
};
@NgModule({
    declarations: [AppComponent, ModalPaymentComponent, SpinnerComponent, HeaderComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        ReactiveFormsModule,
        CurrencyMaskModule,
    ],
    providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
    bootstrap: [AppComponent],
    entryComponents: [ModalPaymentComponent],
})
export class AppModule {}
