import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [PaymentModalComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [PaymentModalComponent, CommonModule, MaterialModule],
  entryComponents: [PaymentModalComponent]
})
export class SharedModule {}
