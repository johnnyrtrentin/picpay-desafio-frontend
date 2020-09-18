import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { ModalPaymentComponent } from 'src/components/modal-payment/modal-payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatBadgeModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ModalPaymentComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatBadgeModule,
        MatDialogModule,
        ReactiveFormsModule,
        CurrencyMaskModule,
    ],
    providers: [HttpClient],
    bootstrap: [ModalPaymentComponent],
})
export class ModalPaymentModule {}
