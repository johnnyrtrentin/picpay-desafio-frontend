import { Component, OnInit } from '@angular/core';

import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UserBalanceService } from 'src/app/core/services/user-balance.service';
import { CreditCardHelper } from 'src/app/shared/helpers/valid-card.helper';
import {
  CreditCardState,
  ICreditCard,
  TransactionsState,
} from 'src/app/shared/state';
import { ITransactionsModel } from 'src/app/shared/state/models/transactions.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  balance: number;
  transactions: ITransactionsModel[];

  cardValidator = CreditCardHelper;

  @Select(CreditCardState.getAllCreditCards)
  creditCards$: Observable<ICreditCard[]>;

  @Select(TransactionsState.getAllTransactions)
  userTransactions$: Observable<ITransactionsModel[]>;

  constructor(private userBalanceService: UserBalanceService) {}

  ngOnInit(): void {
    this.fetchUserBalance();
    this.fetchUserTransactions();
  }

  /**
   * Get all the transactions user from the state
   */
  public fetchUserTransactions(): void {
    this.userTransactions$
      .subscribe((userTransactions) => (this.transactions = userTransactions))
      .unsubscribe();
  }

  /**
   * Get the current user balance value
   */
  public fetchUserBalance(): void {
    this.balance = this.userBalanceService.userBalanceValue$.getValue();
  }
}
