import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { NgxsModule } from '@ngxs/store';

import { TransactionsService } from './transactions.service';
import { TransactionsState } from '../transactions/transaction.state';

import * as transactionMock from '../../../core/mocks/transaction.mock';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([TransactionsState]),
      ],
      providers: [TransactionsService]
    });

    service = TestBed.get(TransactionsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make transaction', () => {
    service
      .makeTransaction(transactionMock.transactionPayload)
      .subscribe((data: transactionMock.ITransactionService) => {
        expect(data.success).toBeTruthy();
        expect(data.status).toBe('Aprovada');
      });

    const req = httpTestingController.expectOne(transactionMock.API_ENDPOINT_MOCK);

    expect(req.request.method).toBe('POST');

    req.flush(transactionMock.response);
  });

  it('shouldnt make transaction', () => {
    service.makeTransaction(transactionMock.transactionPayload).subscribe(
      () => fail('Request failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(400);
        expect(error.error).toBe('400 error');
      }
    );

    const req = httpTestingController.expectOne(transactionMock.API_ENDPOINT_MOCK);
    req.flush('400 error', { status: 400, statusText: 'Error 400' });
  });

  it('should call transaction dispatcher', () => {
    const transactionDispatcherSpy = spyOn(
      service,
      'userTransactionDispatcher'
    ).and.callThrough();
    service.userTransactionDispatcher(5_000, 'Ronaldinho');

    expect(transactionDispatcherSpy).toHaveBeenCalled();
  });

  it('should increase the transaction badge count', () => {
    service.increaseUserTransactionBadgeCount();
    expect(service.transactionBadgeValue).toBe(1);
  });
});
