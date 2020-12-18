import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PaymentForm } from './payment-form';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  paymentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PaymentFormComponent>,
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

    const paymentData = {
      user: this.data.user,
      creditCard: this.paymentForm.value.creditCard,
      value: this.paymentForm.value.value
    }

    this.dialogRef.close(paymentData);
  }
}
