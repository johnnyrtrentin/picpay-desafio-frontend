import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';

@NgModule({
  declarations: [PaymentModalComponent],
  imports: [CommonModule],
  exports: [PaymentModalComponent, CommonModule],
})
export class SharedModule {}
