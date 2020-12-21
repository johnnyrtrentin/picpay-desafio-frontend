import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './page/users.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserRoutingModule} from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {
  CurrencyMaskModule,
  CurrencyMaskConfig,
  CURRENCY_MASK_CONFIG,
} from 'ng2-currency-mask';


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
};


@NgModule({
  declarations: [
    UsersComponent, 
    UserItemComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CurrencyMaskModule
  ],
  exports:[
    UsersComponent
  ],
  providers: [ 
    { 
      provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig
    }
  ]
})
export class UsersModule { }
