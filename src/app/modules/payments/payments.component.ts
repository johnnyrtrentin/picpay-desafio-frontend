import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { User } from '@core/model';
import { CreditCardService } from '@core/services';
import { PaymentFormComponent, PaymentForm } from '@shared/components';

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
