import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';

import { PaymentsComponent } from './payments.component';
import { SharedModule } from '@shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { User, CreditCard } from '@core/model';
import { CreditCardService } from '@core/services';
import { PaymentForm, PaymentFormComponent } from '@shared/components';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;
  let creditCardService: CreditCardService;

  const user: User = {
    id: 1,
    name: 'string',
    img: 'string',
    username: 'string'
  };

  const creditCard: CreditCard = {
    card_number: '1111111111111111',
    cvv: 789,
    expiry_date: '01/18',
  }

  const paymentForm: PaymentForm = {
    user,
    creditCards: [creditCard]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [
        PaymentsComponent,
        UserListComponent 
      ],
      providers: [
        { 
          provide: MatDialog,
          useClass: MatDialogMock 
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    creditCardService = TestBed.get(CreditCardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open payment form', () => {
    const spyDialog = spyOn(component.dialog, 'open').and.callThrough();
    spyOn(creditCardService, 'getCards').and.returnValue([creditCard]);

    component.openPaymentForm(user);

    expect(spyDialog).toHaveBeenCalledWith(PaymentFormComponent, {data: paymentForm});
  });
});
