import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, Card } from 'src/models';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalPaymentService } from './modal-payment.service';

@Component({
    selector: 'app-modal-payment',
    templateUrl: './modal-payment.component.html',
    styleUrls: ['./modal-payment.component.scss'],
    providers: [ModalPaymentService],
})
export class ModalPaymentComponent {
    user: User;
    cards: Card[];
    paymentForm: FormGroup;
    validationMessages = {
        value: [{ type: 'required', message: 'A inserção de valor é obrigatória.' }],
        card: [{ type: 'required', message: 'O cartão é obrigatório.' }],
    };

    constructor(
        public dialogRef: MatDialogRef<ModalPaymentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User,
        private modalPaymentService: ModalPaymentService
    ) {
        if (data) {
            this.user = data;
            this.getCards();
            this.formValidations();
        }
    }

    formValidations() {
        this.paymentForm = new FormGroup({
            value: new FormControl('', Validators.compose([Validators.required])),
            card: new FormControl('', Validators.compose([Validators.required])),
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
        let previousCard = [];
        this.cards.map((card: Card) => {
            previousCard.push({
                ...card,
                final: card.card_number.slice(card.card_number.length - 4, card.card_number.length),
            });
        });
        this.cards = previousCard;
    }

    sendPayment(user: User) {
        this.modalPaymentService
            .sendPayment(user, this.paymentForm.value)
            .subscribe((res: { status: string; success: string }) => {
                if (res.success) {
                    if (res.status === 'Aprovada' && this.paymentForm.value.card.card_number === '1111111111111111') {
                        console.log('foi');
                    } else {
                        console.log('n foi');
                    }
                }
                this.closeModal();
            });
    }

    closeModal() {
        this.dialogRef.close('modal-payment');
    }
}
