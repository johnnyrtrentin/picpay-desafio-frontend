import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MatLine } from '@angular/material';

import { NgxsModule, Store } from '@ngxs/store';
import {
  CreditCardState,
  ICreditCard,
  SetTransaction,
  TransactionsState,
} from 'src/app/shared/state';

import { DashboardModule } from './dashboard.module';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let store: Store;

  const creditCardMock: ICreditCard[] = [
    {
      card_number: '4111111111111234',
      cvv: 789,
      expiry_date: '01/18',
    },
    {
      card_number: '4111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        NgxsModule.forRoot([CreditCardState, TransactionsState]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user balance', () => {
    component.fetchUserBalance();
    expect(component.balance).toBe(6_000);
  });

  it('should display the user current balance', () => {
    const matLine = fixture.debugElement.queryAll(By.directive(MatLine));
    const actualBalance = matLine[1].nativeElement as HTMLDivElement;
    expect(actualBalance.textContent).toBe('Saldo Atual: R$6,000.00');
  });

  it('should display the credit cards quantity', () => {
    store.reset({
      ...store.snapshot(),
      ...creditCardMock,
    });

    const matLine = fixture.debugElement.queryAll(By.directive(MatLine));
    const userCreditCards = matLine[0].nativeElement as HTMLDivElement;

    expect(userCreditCards.textContent).toBe(' Cartões cadastrados: 2 ');
  });

  it('should display the final numbers and due date of the credit cards', () => {
    store.reset({
      ...store.snapshot(),
      ...creditCardMock,
    });

    const matLine = fixture.debugElement.queryAll(By.directive(MatLine));
    expect(matLine[2].nativeElement.textContent).toBe(' Terminado em 1234 ');
    expect(matLine[3].nativeElement.textContent).toBe(' Vencimento: 01/20 ');
    expect(matLine[4].nativeElement.textContent).toBe(' Terminado em 1111 ');
    expect(matLine[5].nativeElement.textContent).toBe(' Vencimento: 01/18 ');
  });

  it('should display the transaction feed', () => {
    store.dispatch(new SetTransaction(1_250, 'Jon Snow'));

    component.fetchUserTransactions();
    expect(component.transactions).toEqual([
      { paymentValue: 1_250, paymentUser: 'Jon Snow' },
    ]);

    fixture.detectChanges();

    const matLine = fixture.debugElement.queryAll(By.directive(MatLine));
    expect(matLine[0].nativeElement.textContent).toBe(
      ' Você efetuou um pagamento para Jon Snow no valor de R$1250 '
    );
  });
});
