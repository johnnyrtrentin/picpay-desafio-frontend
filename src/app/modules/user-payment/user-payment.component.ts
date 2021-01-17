import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { PaymentModalComponent } from 'src/app/shared/components/payment-modal/payment-modal.component';
import {
  CreditCardState,
  GetAllUsers,
  ICreditCard,
  IUsers,
  UsersState,
} from 'src/app/shared/state';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss'],
})
export class UserPaymentComponent implements OnInit {
  loading = true;

  @Select(UsersState.getUsers)
  public users$: Observable<IUsers[]>;

  @Select(CreditCardState.getAllCreditCards)
  public creditCards$: Observable<ICreditCard[]>;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchUserList();
  }

  /**
   * Send a dispatcher to the state, to return all users
   */
  private fetchUserList(): void {
    this.store
      .dispatch(new GetAllUsers())
      .pipe(withLatestFrom(this.users$))
      .subscribe(([storeValues, actionValues]) => {
        if (actionValues) {
          this.loading = false;
        }
      });
  }

  public userSelected(user: IUsers): void {
    const userCreditCards: ICreditCard[] = [];

    this.creditCards$
      .subscribe((creditCards) => userCreditCards.push(...creditCards))
      .unsubscribe();

    this.dialog.open(PaymentModalComponent, {
      data: {
        user,
        userCreditCards,
      },
    });
  }
}
