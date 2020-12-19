import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { User } from '@core/model/user';
import { CreditCardService } from '@core/services/credit-card.service';
import { PaymentForm } from '@shared/components/payment-form/payment-form';
import { PaymentFormComponent } from '@shared/components/payment-form/payment-form.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {

  loading: boolean;

  constructor(
    public dialog: MatDialog,
    private creditCardService: CreditCardService
    ) { }

  openPaymentForm(user: User) {
    const creditCards = this.creditCardService.getCards();
    const paymentForm: PaymentForm = {
      user,
      creditCards
    }

    this.dialog.open(PaymentFormComponent, {data: paymentForm});
  }
}
