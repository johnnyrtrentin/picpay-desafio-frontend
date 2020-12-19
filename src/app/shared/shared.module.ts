import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from "ngx-currency";
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
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
