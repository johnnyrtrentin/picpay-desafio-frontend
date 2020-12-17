import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { SharedModule } from '@shared/shared.module';
import { PaymentsComponent } from './payments.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    PaymentsComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule,
  ]
})
export class PaymentsModule { }
