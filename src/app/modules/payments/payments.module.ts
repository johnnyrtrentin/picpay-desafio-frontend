import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { SharedModule } from '@shared/shared.module';
import { PaymentsComponent } from './payments.component';

@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule,
  ]
})
export class PaymentsModule { }
