import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from "ngx-currency";
import { MatButtonModule, 
  MatCardModule, 
  MatDialogModule, 
  MatFormFieldModule, 
  MatIconModule, 
  MatInputModule, 
  MatMenuModule, 
  MatProgressSpinnerModule, 
  MatRippleModule, 
  MatSelectModule, 
  MatSnackBarModule, 
  MatToolbarModule } from '@angular/material';

import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PaymentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  entryComponents: [
    PaymentFormComponent
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,

    PaymentFormComponent
  ]
})
export class SharedModule { }
