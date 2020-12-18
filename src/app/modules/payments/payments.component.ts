import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { User } from '@core/model/user';
import { CreditCardService } from '@core/services/credit-card.service';
import { PaymentForm } from '@shared/components/payment-form/payment-form';
import { PaymentData } from './shared/payment-data';
import { PaymentsService } from './shared/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {

  loading: boolean;

  constructor(
    private paymentsService: PaymentsService,
    private creditCardService: CreditCardService,
    private snackBar: MatSnackBar
    ) { }

  openPaymentForm(user: User) {
    const paymentForm: PaymentForm = {
      user,
      creditCards: this.creditCardService.getCards()
    }

    this.paymentsService.openPaymentForm(paymentForm)
      .afterClosed()
      .subscribe((data: PaymentData) => {
        if (!data) {
          return;
        }

        this.loading = true;
        
        const paymentTransaction: PaymentTransaction = {
          card_number: data.creditCard.card_number,
          cvv: data.creditCard.cvv,
          expiry_date: data.creditCard.expiry_date,
          destination_user_id: data.user.id,
          value: data.value
        };

        this.paymentsService.pay(paymentTransaction).subscribe(() => {
          const message = paymentTransaction.card_number === '1111111111111111' 
            ? 'O pagamento foi concluído com sucesso'
            : 'O pagamento não foi concluído com sucesso';
          
          this.showMessage(message);
          this.loading = false;
        }, () => {
          this.showMessage('Ocorreu um erro inesperado');
          this.loading = false;
        });
    });
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
