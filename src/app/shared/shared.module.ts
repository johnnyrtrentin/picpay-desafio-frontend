import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CurrencyMaskModule } from 'ngx-currency-mask';

import { MaterialModule } from './material/material.module';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';

import {
  CurrencyMaskConfig,
  CURRENCY_MASK_CONFIG,
} from 'ngx-currency-mask/src/currency-mask.config';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  allowZero: false,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
};

@NgModule({
  declarations: [PaymentModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
  ],
  exports: [
    PaymentModalComponent,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [PaymentModalComponent],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
})
export class SharedModule {}
