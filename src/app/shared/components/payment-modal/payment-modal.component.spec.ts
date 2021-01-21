import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';

import { SharedModule } from '../../shared.module';
import { UserBalanceService } from 'src/app/core/services/user-balance.service';
import { TransactionsService } from '../../state/services/transactions.service';

import { PaymentModalComponent } from './payment-modal.component';

import * as paymentMock from '../../../core/mocks/payment.mock';
import * as transactionMock from '../../../core/mocks/transaction.mock';

describe('PaymentModalComponent', () => {
  let component: PaymentModalComponent;
  let fixture: ComponentFixture<PaymentModalComponent>;

  let errors = {};
  let dialogRef: MatDialogRef<PaymentModalComponent>;
  let toaster: MatSnackBar;

  let userBalanceService: UserBalanceService;
  let transactionsService: TransactionsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NgxsModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: paymentMock.modalData },
        { provide: MatDialogRef, useValue: paymentMock.dialogRef },
        { provide: TransactionsService, useValue: transactionMock.transactionService }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentModalComponent);

    toaster = TestBed.get(MatSnackBar);
    dialogRef = TestBed.get(MatDialogRef);
    userBalanceService = TestBed.get(UserBalanceService);
    transactionsService = TestBed.get(TransactionsService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the user balance', () => {
    component.fetchUserBalance();
    expect(component.userBalance).toBe(6_000);
  });

  it('should create the paymentForm', () => {
    component.createPaymentForm();
    expect(component.modalForm).toBeDefined();
  });

  it('should display the infos about the user', () => {
    const name = fixture.debugElement.query(By.css('b')).nativeElement;
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    const userImg = imgElement.getAttribute('src');

    expect(name.textContent).toBe('Heisenberg');
    expect(userImg).toBe('http://localhost:3000/images/person');
  });

  it('should button submit payment be disabled', () => {
    const paymentButton = fixture.debugElement.queryAll(By.css('button'))[1];
    expect(paymentButton.nativeElement.disabled).toBeTruthy();
  });

  it('should not be a valid form', () => {
    component.modalForm.controls.paymentCreditCard.setValue({
      cvv: 1231312,
      card_number: '4111111111111234',
      expiry_date: '123123113',
    });

    const paymentSpy = spyOn(component, 'doPayment').and.callThrough();

    component.submitPayment();

    expect(component.modalForm.valid).toBeFalsy();
    expect(paymentSpy).not.toHaveBeenCalled();
  });

  it('should validate the mandatory error in the value field', () => {
    const valueField = component.modalForm.controls.paymentValue;

    errors = valueField.errors || {};
    expect(errors[paymentMock.FormErros.REQUIRED]).toBeTruthy();
    expect(valueField.valid).toBeFalsy();
  });

  it ('should validate the minimum error in the value field', () => {
    const valueField = component.modalForm.controls.paymentValue;

    valueField.setValue(0);
    errors = valueField.errors || {};

    expect(errors[paymentMock.FormErros.REQUIRED]).toBeFalsy();
    expect(errors[paymentMock.FormErros.MIN]).toBeTruthy();
    expect(valueField.valid).toBeFalsy();
  });

  it('should validate the insufficientBalance error in the value field', () => {
    const valueField = component.modalForm.controls.paymentValue;

    valueField.setValue(7_000);
    errors = valueField.errors || {};

    expect(errors[paymentMock.FormErros.REQUIRED]).toBeFalsy();
    expect(errors[paymentMock.FormErros.MIN]).toBeFalsy();
    expect(errors[paymentMock.FormErros.INSUFFICIENT_BALLANCE]).toBeTruthy();
    expect(valueField.valid).toBeFalsy();
  });

  it('should validate the required credit card field', () => {
    const creditCardField = component.modalForm.controls.paymentCreditCard;

    expect(creditCardField.valid).toBeFalsy();

    errors = creditCardField.errors || {};
    expect(errors[paymentMock.FormErros.REQUIRED]).toBeTruthy();

    creditCardField.setValue('4111111111111234');
    errors = creditCardField.errors || {};
    expect(errors[paymentMock.FormErros.REQUIRED]).toBeFalsy();
  });

  it('should call payment transaction function when submit', () => {

    const doPaymentSpy = spyOn(component, 'doPayment').and.callThrough();

    component.modalForm.controls.paymentCreditCard.setValue(paymentMock.validCreditCard);
    component.modalForm.controls.paymentValue.setValue(250);
    component.submitPayment();

    expect(doPaymentSpy).toHaveBeenCalled();
    expect(component.modalLoading).toBeTruthy();
  });

  it('shouldnt call payment transaction function when submit', () => {

    const doPaymentSpy = spyOn(component, 'doPayment').and.callThrough();
    const dialogRefSpy = spyOn(dialogRef, 'close');

    component.modalForm.controls.paymentCreditCard.setValue(paymentMock.invalidCreditCard);
    component.modalForm.controls.paymentValue.setValue(250);
    component.submitPayment();

    expect(doPaymentSpy).not.toHaveBeenCalled();
    expect(dialogRefSpy).toHaveBeenCalled();
  });

  it('should do payment transaction', () => {
    const dialogSpy = spyOn(dialogRef, 'close');
    const toasterSpy = spyOn(toaster, 'open');
    const doPaymentSpy = spyOn(component, 'doPayment').and.callThrough();
    const updateBalanceSpy = spyOn(userBalanceService, 'updateUserBalance').and.callThrough();
    const increaseBadgeSpy = spyOn(transactionsService, 'increaseUserTransactionBadgeCount').and.callThrough();
    const makeTransactionSpy = spyOn(transactionsService, 'makeTransaction').and.returnValue(of(paymentMock.validTransactionPayload));
    const transactionDispatcherSpy = spyOn(transactionsService, 'userTransactionDispatcher').and.callThrough();

    component.modalForm.controls.paymentCreditCard.setValue(paymentMock.validCreditCard);
    component.modalForm.controls.paymentValue.setValue(250);

    component.doPayment(paymentMock.validTransactionPayload);

    expect(dialogSpy).toHaveBeenCalled();
    expect(toasterSpy).toHaveBeenCalled();
    expect(doPaymentSpy).toHaveBeenCalledWith(paymentMock.validTransactionPayload);
    expect(increaseBadgeSpy).toHaveBeenCalled();
    expect(updateBalanceSpy).toHaveBeenCalledWith(250);
    expect(makeTransactionSpy).toHaveBeenCalled();
    expect(makeTransactionSpy).toHaveBeenCalledWith(paymentMock.validTransactionPayload);
    expect(transactionDispatcherSpy).toHaveBeenCalled();
  });
});
