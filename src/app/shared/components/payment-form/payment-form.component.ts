import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { PaymentForm } from './payment-form';
import { PaymentsService } from 'src/app/modules/payments/shared/payments.service';
import { AccountService, CreditCardService } from '@core/services';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  paymentForm: FormGroup;
  loading: boolean;
  balance: number;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PaymentFormComponent>,
    private paymentsService: PaymentsService,
    private creditCardService: CreditCardService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: PaymentForm
  ) {}

  ngOnInit() {
    this.getBalance();
    this.buildForm();
  }

  getBalance() {
    this.accountService.balance$.subscribe((value: number) => {
      this.balance = value;      
    });
  }

  buildForm() {
    this.paymentForm = this.formBuilder.group({
      value: [null, [Validators.required, Validators.min(0.01), valueValidator(this.balance)]],
      creditCard: [null, Validators.required]
    });
  }

  submit() {
    if (!this.paymentForm.valid) {
      return;
    }

    this.loading = true;

    const formData = this.paymentForm.value;        
    const paymentTransaction = {
      card_number: formData.creditCard.card_number,
      cvv: formData.creditCard.cvv,
      expiry_date: formData.creditCard.expiry_date,
      value: formData.value,
      destination_user_id: this.data.user.id
    };

    this.paymentsService.pay(paymentTransaction).subscribe(() => {
      let message: string;
      const validCard = this.creditCardService.checkCreditCard(paymentTransaction.card_number);

      if (validCard) {
        message = 'O pagamento foi concluído com sucesso';
        this.dialogRef.close();
        this.accountService.updateBalance(paymentTransaction.value);
      } else {
        this.loading = false;
        message = 'O pagamento não foi concluído com sucesso';
      }

      this.showMessage(message);
    }, () => {
      this.showMessage('Ocorreu um erro inesperado');
      this.loading = false;
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

export function valueValidator(balance: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valueBalance = control.value > balance;
    return valueBalance ? {invalidBalance: {value: control.value}} : null;
  };
}
