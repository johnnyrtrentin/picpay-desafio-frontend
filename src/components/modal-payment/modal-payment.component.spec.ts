import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ModalPaymentComponent } from './modal-payment.component';
import { ModalPaymentService } from './modal-payment.service';

describe('Validate authentication service', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalPaymentComponent],
        }).compileComponents();
    }));

    it('Validate payment service', inject([ModalPaymentService], (service: ModalPaymentService) => {
        expect(
            service.sendPayment(1002, {
                value: '33.30',
                card: {
                    card_number: '1111111111111111',
                    cvv: 444,
                    expiry_date: '01/18',
                },
            })
        ).toBeTruthy();
    }));

    it('Validate payment service that does not pass', inject([ModalPaymentService], (service: ModalPaymentService) => {
        expect(
            service.sendPayment(1001, {
                value: '33.33',
                card: {
                    card_number: '4111111111111234',
                    cvv: 333,
                    expiry_date: '01/20',
                },
            })
        ).toBeFalsy();
    }));
});
