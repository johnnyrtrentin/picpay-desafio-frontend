import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { NgxCurrencyModule } from 'ngx-currency';
import { 
  MatDialogModule, 
  MatDialogRef, 
  MatFormFieldModule, 
  MatInputModule, 
  MatProgressSpinnerModule, 
  MatSelectModule, 
  MatSnackBar, 
  MatSnackBarModule, 
  MAT_DIALOG_DATA 
} from '@angular/material';

import { CreditCard } from '@core/model/credit-card';
import { User } from '@core/model/user';
import { AccountService } from '@core/services/account.service';
import { PaymentTransaction } from 'src/app/modules/payments/shared/payment-transaction';
import { PaymentsService } from 'src/app/modules/payments/shared/payments.service';
import { PaymentForm } from './payment-form';
import { PaymentFormComponent } from './payment-form.component';

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  let paymentService: PaymentsService;
  let accountService: AccountService;
  let dialogRef: MatDialogRef<PaymentFormComponent>;
  let snackBar: MatSnackBar;

  const mockDialogRef = { 
    close: () => false,
    beforeClosed: () => of({})
  };

  const user: User = {
    id: 1,
    name: 'string',
    img: 'string',
    username: 'string'
  };

  const creditCardValid: CreditCard = {
    card_number: '1111111111111111',
    cvv: 789,
    expiry_date: '01/18',
  }

  const creditCardInvalid: CreditCard = {
    card_number: '4111111111111234',
    cvv: 123,
    expiry_date: '01/20',
  }

  const paymentForm: PaymentForm = {
    user,
    creditCards: [creditCardValid, creditCardInvalid]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
      ],
      declarations: [ 
        PaymentFormComponent
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: paymentForm
        },
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    paymentService = TestBed.get(PaymentsService);
    accountService = TestBed.get(AccountService);
    dialogRef = TestBed.get(MatDialogRef);
    snackBar = TestBed.get(MatSnackBar)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be an invalid form', () => {
    const spyPaymentService = spyOn(paymentService, 'pay').and.callThrough();

    component.submit();

    expect(component.paymentForm.valid).toBeFalsy();
    expect(component.loading).toBeUndefined();
    expect(spyPaymentService).not.toHaveBeenCalled();
  });

  it('should validate value field', () => {
    let errors = {};
    let value = component.paymentForm.controls['value'];
    
    expect(value.valid).toBeFalsy();

    errors = value.errors || {};
    expect(errors['required']).toBeTruthy();

    value.setValue(0);
    errors = value.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['min']).toBeTruthy();

    value.setValue(100);
    errors = value.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['min']).toBeFalsy();
  });

  it('should validate creditCard field', () => {
    let errors = {};
    let creditCard = component.paymentForm.controls['creditCard'];
    
    expect(creditCard.valid).toBeFalsy();

    errors = creditCard.errors || {};
    expect(errors['required']).toBeTruthy();

    creditCard.setValue('1111111111111111');
    errors = creditCard.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should validate balance', () => {
    let errors = {};
    let value = component.paymentForm.controls['value'];

    value.setValue(2000);
    errors = value.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['invalidBalance']).toBeTruthy();

    value.setValue(1000);
    errors = value.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['invalidBalance']).toBeFalsy();
  });

  it('should send payment', () => {
    const spyPaymentService = spyOn(paymentService, 'pay').and.returnValue(of({}));
    const spyAccountService = spyOn(accountService, 'updateBalance').and.callThrough();
    const spyDialog = spyOn(dialogRef, 'close');
    const spyShowMessage = spyOn<any>(component, 'showMessage').and.callThrough();
    const spySnackBar = spyOn(snackBar, 'open');
    const message = 'O pagamento foi concluído com sucesso';
    const paymentTransaction: PaymentTransaction = {
      card_number: creditCardValid.card_number,
      cvv: creditCardValid.cvv,
      expiry_date: creditCardValid.expiry_date,
      destination_user_id: user.id,
      value: 100
    };

    component.paymentForm.controls['value'].setValue(100);
    component.paymentForm.controls['creditCard'].setValue(creditCardValid);

    component.submit();

    expect(spyDialog).toHaveBeenCalled();
    expect(spyPaymentService).toHaveBeenCalledWith(paymentTransaction);
    expect(spyAccountService).toHaveBeenCalledWith(100);
    expect(spyShowMessage).toHaveBeenCalledWith(message);
    expect(spySnackBar).toHaveBeenCalled();
  });

  it('should recuse payment', () => {
    const spyPaymentService = spyOn(paymentService, 'pay').and.returnValue(of({}));
    const spyShowMessage = spyOn<any>(component, 'showMessage').and.callThrough();
    const spySnackBar = spyOn(snackBar, 'open');
    const message = 'O pagamento não foi concluído com sucesso';
    const paymentTransaction: PaymentTransaction = {
      card_number: creditCardInvalid.card_number,
      cvv: creditCardInvalid.cvv,
      expiry_date: creditCardInvalid.expiry_date,
      destination_user_id: user.id,
      value: 100
    };

    component.paymentForm.controls['value'].setValue(100);
    component.paymentForm.controls['creditCard'].setValue(creditCardInvalid);

    component.submit();

    expect(component.loading).toBeFalsy();
    expect(spyPaymentService).toHaveBeenCalledWith(paymentTransaction);
    expect(spyShowMessage).toHaveBeenCalledWith(message);
    expect(spySnackBar).toHaveBeenCalled();
  });

  it('should have failed payment', () => {
    const spyPaymentService = spyOn(paymentService, 'pay').and.returnValue(throwError({message: 'error'}));
    const spyShowMessage = spyOn<any>(component, 'showMessage');

    component.paymentForm.controls['value'].setValue(100);
    component.paymentForm.controls['creditCard'].setValue(creditCardValid);
    component.submit();

    expect(spyPaymentService).toHaveBeenCalled();
    expect(spyShowMessage).toHaveBeenCalled();
    expect(component.loading).toEqual(false);
  });
});
