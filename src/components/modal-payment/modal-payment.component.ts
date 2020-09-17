import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, Card } from 'src/models';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-modal-payment',
    templateUrl: './modal-payment.component.html',
    styleUrls: ['./modal-payment.component.scss'],
})
export class ModalPaymentComponent {
    user: User;
    cards: Card[];
    paymentForm: FormGroup;
    validation_messages = {
        value: [
            { type: 'required', message: 'A inserção de valor é obrigatória.' },
            { type: 'pattern', message: 'Digite um e-mail válido.' },
        ],
        card: [{ type: 'required', message: 'O cartão é obrigatório.' }],
    };

    constructor(public dialogRef: MatDialogRef<ModalPaymentComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
        if (data) {
            this.user = data;
            this.getCards();
            this.formValidations();
        }
    }

    formValidations() {
        this.paymentForm = new FormGroup({
            value: new FormControl('', Validators.compose([Validators.required])),
            number_card: new FormControl(' ', Validators.compose([Validators.required])),
        });
    }

    getCards() {
        this.cards = [
            {
                card_number: '1111111111111111',
                cvv: 789,
                expiry_date: '01/18',
            },
            {
                card_number: '4111111111111234',
                cvv: 123,
                expiry_date: '01/20',
            },
        ];
    }

    sendPayment() {
        this.closeModal();
    }

    closeModal() {
        this.dialogRef.close('modal-payment');
    }
}
