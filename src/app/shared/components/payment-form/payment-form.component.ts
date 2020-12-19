import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { PaymentForm } from './payment-form';
import { PaymentsService } from 'src/app/modules/payments/shared/payments.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  paymentForm: FormGroup;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PaymentFormComponent>,
    private paymentsService: PaymentsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: PaymentForm
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.paymentForm = this.formBuilder.group({
      value: [null, [Validators.required, Validators.min(1)]],
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
      if (paymentTransaction.card_number === '1111111111111111') {
        this.dialogRef.close();
        message = 'O pagamento foi concluído com sucesso';
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
