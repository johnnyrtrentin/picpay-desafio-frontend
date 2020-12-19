import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { PaymentsService } from './payments.service';
import { PaymentTransaction } from './payment-transaction';

describe('PaymentsService', () => {

  let service: PaymentsService;
  let httpTestingController: HttpTestingController;
  const BASE_API_URL = 'https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989';
  const paymentTransaction: PaymentTransaction = {
    card_number: 'string',
    cvv: 1,
    expiry_date: 'string',
    destination_user_id: 1,
    value: 1
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      MatDialogModule
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(PaymentsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make payment', (done) => {
    service.pay(paymentTransaction).subscribe(data => {
      done();
    });

    const req = httpTestingController.expectOne(BASE_API_URL);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should return error', (done) => {
    service.pay(paymentTransaction).subscribe(
      () => fail('Should have failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(400);
        expect(error.error).toContain('400 error');
        done();
      }
    );

    const req = httpTestingController.expectOne(BASE_API_URL);
    req.flush('400 error', { status: 400, statusText: 'Error 400' });
  });
});
