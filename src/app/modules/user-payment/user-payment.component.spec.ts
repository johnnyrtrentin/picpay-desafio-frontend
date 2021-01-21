import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { of } from 'rxjs';
import { PaymentModalComponent } from 'src/app/shared/components/payment-modal/payment-modal.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { CreditCardState, UsersState } from 'src/app/shared/state';
import { UsersService } from 'src/app/shared/state/services/users.service';

import { UserPaymentComponent } from './user-payment.component';

import * as usersMock from '../../core/mocks/user.mock';

describe('UserPaymentComponent', () => {
  let component: UserPaymentComponent;
  let fixture: ComponentFixture<UserPaymentComponent>;
  let store: Store;
  let userService: UsersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserPaymentComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([UsersState, CreditCardState]),
      ],
      providers: [
        {
          provide: UsersService,
          useValue: usersMock.userService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    userService = TestBed.get(UsersService);

    fixture = TestBed.createComponent(UserPaymentComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the loading', () => {
    component.loading = true;

    spyOn(userService, 'fetchUsers').and.returnValue(of([]));

    fixture.detectChanges();

    const userContainer = fixture.debugElement.query(By.css('.container__content'));
    const loadingSpínner = fixture.debugElement.query(By.css('mat-spinner'));

    expect(loadingSpínner.nativeElement).not.toBeUndefined();
    expect(component.loading).toBeTruthy();
    expect(userContainer).toBeNull();
  });

  it('should retrieve the users from store', () => {
    component.fetchUserList();
    component.users$.subscribe(([{ id, username, name, img }]) => {
      expect(id).toBe(1);
      expect(username).toBe('@tyriontargaryen');
      expect(name).toBe('Tyrion Targaryen');
      expect(img).toBe('http://localhost/imagem/tyrion');
    });
    expect(component.loading).toBeFalsy();
  });

  it('should renderer the user list', () => {
    const userContainer = fixture.debugElement.query(By.css('.container__content'));
    expect(userContainer.nativeElement).toBeDefined();
  });

  it ('should display the user in the list', () => {
    const name = fixture.debugElement.query(By.css('p'));
    const username = fixture.debugElement.query(By.css('h3'));
    expect(username.nativeElement.textContent).toBe('@tyriontargaryen');
    expect(name.nativeElement.textContent).toBe(' Tyrion Targaryen ');
  });

  it('should open the payment modal', () => {
    const [ user ] = usersMock.user;
    const userCreditCards = usersMock.userCreditCards;
    const modalSpy = spyOn(TestBed.get(MatDialog), 'open');

    component.userSelected(user);
    component.creditCards$.subscribe(creditCards => {
      expect(creditCards).toBeDefined();
    });

    expect(modalSpy).toHaveBeenCalled();
    expect(modalSpy).toHaveBeenCalledWith(PaymentModalComponent, {
      data: { user, userCreditCards }
    });
  });

  it('should click in one user in the list', () => {
    const list = fixture.debugElement.query(By.css('.list-select'));
    const userSelectSpy = spyOn(component, 'userSelected');

    list.triggerEventHandler('click', null);
    expect(userSelectSpy).toHaveBeenCalled();
  });
});
