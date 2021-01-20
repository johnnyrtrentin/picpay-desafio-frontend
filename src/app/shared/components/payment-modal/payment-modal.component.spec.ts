import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';

import { ICreditCard } from '../../state';
import { SharedModule } from '../../shared.module';
import { UserBalanceService } from 'src/app/core/services/user-balance.service';
import { TransactionsService } from '../../state/services/transactions.service';
import { IPayment, ITransactionPayload } from '../../state/models/transactions.interface';

import { PaymentModalComponent } from './payment-modal.component';

describe('PaymentModalComponent', () => {
  let component: PaymentModalComponent;
  let fixture: ComponentFixture<PaymentModalComponent>;

  let errors = {};
  let dialogRef: MatDialogRef<PaymentModalComponent>;
  let toaster: MatSnackBar;

  let userBalanceService: UserBalanceService;
  let transactionsService: TransactionsService;

  const modalDataMock: IPayment = {
    user: {
      id: 12,
      img: 'http://localhost:3000/images/person',
      name: 'Heisenberg',
      username: '@saymyname',
    },
    userCreditCards: [
      {
        card_number: '4111111111111234',
        cvv: 123,
        expiry_date: '01/20',
      },
      {
        card_number: '4111111111111111',
        cvv: 789,
        expiry_date: '01/18',
      },
    ],
  };

  const mockDialogRef = {
    close: () => false,
    beforeClosed: () => of({})
  };

  const transactionServiceMock = {
    makeTransaction: () => of({}),
    userTransactionDispatcher: () => {},
    increaseUserTransactionBadgeCount: () => {}
  };

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
        { provide: MAT_DIALOG_DATA, useValue: modalDataMock },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: TransactionsService, useValue: transactionServiceMock }
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
    expect(errors['required']).toBeTruthy();
    expect(valueField.valid).toBeFalsy();
  });

  it ('should validate the minimum error in the value field', () => {
    const valueField = component.modalForm.controls.paymentValue;

    valueField.setValue(0);
    errors = valueField.errors || {};

    expect(errors['required']).toBeFalsy();
    expect(errors['min']).toBeTruthy();
    expect(valueField.valid).toBeFalsy();
  });

  it('should validate the insufficientBalance error in the value field', () => {
    const valueField = component.modalForm.controls.paymentValue;

    valueField.setValue(7_000);
    errors = valueField.errors || {};

    expect(errors['required']).toBeFalsy();
    expect(errors['min']).toBeFalsy();
    expect(errors['insufficientBalance']).toBeTruthy();
    expect(valueField.valid).toBeFalsy();
  });

  it('should validate the required credit card field', () => {
    const creditCardField = component.modalForm.controls.paymentCreditCard;
    const required = 'required';

    expect(creditCardField.valid).toBeFalsy();

    errors = creditCardField.errors || {};
    expect(errors['required']).toBeTruthy();

    creditCardField.setValue('4111111111111234');
    errors = creditCardField.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should call payment transaction function when submit', () => {
    const creditCard: ICreditCard = {
      cvv: 142,
      card_number: '1111111111111111',
      expiry_date: '01/18'
    };
    const doPaymentSpy = spyOn(component, 'doPayment').and.callThrough();

    component.modalForm.controls.paymentCreditCard.setValue(creditCard);
    component.modalForm.controls.paymentValue.setValue(250);
    component.submitPayment();

    expect(doPaymentSpy).toHaveBeenCalled();
    expect(component.modalLoading).toBeTruthy();
  });

  it('shouldnt call payment transaction function when submit', () => {
    const creditCard: ICreditCard = {
      cvv: 142,
      card_number: '4111111111111234',
      expiry_date: '01/18'
    };
    const doPaymentSpy = spyOn(component, 'doPayment').and.callThrough();
    const dialogRefSpy = spyOn(dialogRef, 'close');

    component.modalForm.controls.paymentCreditCard.setValue(creditCard);
    component.modalForm.controls.paymentValue.setValue(250);
    component.submitPayment();

    expect(doPaymentSpy).not.toHaveBeenCalled();
    expect(dialogRefSpy).toHaveBeenCalled();
  });

  it('should do payment transaction', () => {
    const creditCard: ICreditCard = {
      cvv: 142,
      card_number: '1111111111111111',
      expiry_date: '01/18'
    };
    const transactionPayload: ITransactionPayload = {
      card_number: creditCard.card_number,
      cvv: creditCard.cvv,
      expiry_date: creditCard.expiry_date,
      value: 250,
      destination_user_id: modalDataMock.user.id
    };
    const dialogSpy = spyOn(dialogRef, 'close');
    const toasterSpy = spyOn(toaster, 'open');
    const doPaymentSpy = spyOn(component, 'doPayment').and.callThrough();
    const updateBalanceSpy = spyOn(userBalanceService, 'updateUserBalance').and.callThrough();
    const increaseBadgeSpy = spyOn(transactionsService, 'increaseUserTransactionBadgeCount').and.callThrough();
    const makeTransactionSpy = spyOn(transactionsService, 'makeTransaction').and.returnValue(of(transactionPayload));
    const transactionDispatcherSpy = spyOn(transactionsService, 'userTransactionDispatcher').and.callThrough();

    component.modalForm.controls.paymentCreditCard.setValue(creditCard);
    component.modalForm.controls.paymentValue.setValue(250);

    component.doPayment(transactionPayload);

    expect(dialogSpy).toHaveBeenCalled();
    expect(toasterSpy).toHaveBeenCalled();
    expect(doPaymentSpy).toHaveBeenCalledWith(transactionPayload);
    expect(increaseBadgeSpy).toHaveBeenCalled();
    expect(updateBalanceSpy).toHaveBeenCalledWith(250);
    expect(makeTransactionSpy).toHaveBeenCalled();
    expect(makeTransactionSpy).toHaveBeenCalledWith(transactionPayload);
    expect(transactionDispatcherSpy).toHaveBeenCalled();
  });
});
