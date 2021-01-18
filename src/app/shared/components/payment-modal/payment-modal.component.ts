import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserBalanceService } from 'src/app/core/services/user-balance.service';
import {
  IPayment,
  ITransactionPayload,
} from '../../state/models/transactions.interface';
import { TransactionsService } from '../../state/services/transactions.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
  modalForm: FormGroup;
  userBalance: number;

  constructor(
    private dialogRef: MatDialogRef<PaymentModalComponent>,
    private formBuilder: FormBuilder,
    private userBalanceService: UserBalanceService,
    private transactionsService: TransactionsService,
    @Inject(MAT_DIALOG_DATA) public data: IPayment
  ) {}

  ngOnInit(): void {
    this.fetchUserBalance();
    this.createPaymentForm();
  }

  /**
   * Fetch the actual user balance, to send to validator before that is created.
   */
  private fetchUserBalance(): void {
    this.userBalance = this.userBalanceService.userBalanceValue$.getValue();
  }

  /**
   * Create the form and your fields validations
   */
  private createPaymentForm(): void {
    this.modalForm = this.formBuilder.group({
      paymentValue: [
        '',
        [
          Validators.required,
          Validators.min(0.01),
          userBalanceValidator(this.userBalance),
        ],
      ],
      paymentCreditCard: ['', [Validators.required]],
    });
  }

  /**
   * Effect the payment to the user selected
   */
  public doPayment(): void {
    const formValues = this.modalForm.value;
    const transactionPayload: ITransactionPayload = {
      card_number: formValues.paymentCreditCard.card_number,
      cvv: formValues.paymentCreditCard.ccv,
      expiry_date: formValues.paymentCreditCard.expiry_date,
      destination_user_id: this.data.user.id,
      value: formValues.paymentValue,
    };

    this.userBalanceService.updateUserBalance(formValues.paymentValue);
    this.transactionsService
      .makeTransaction(transactionPayload)
      .subscribe((response) => {
        if (response) {
          this.transactionsService.userTransactionDispatcher(
            transactionPayload.value,
            this.data.user.name
          );
        }
        this.dialogRef.close();
      });
  }
}

/**
 * Custom form validator function to check if the payment is higher or not
 * to the current user balance
 * @param balance Current user balance
 */
function userBalanceValidator(balance: number) {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const paymentIsHigherThanBalance = control.value > balance;
    return paymentIsHigherThanBalance ? { insufficientBalance: true } : null;
  };
}
