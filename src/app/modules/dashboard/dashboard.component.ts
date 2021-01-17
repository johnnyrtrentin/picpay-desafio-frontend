import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UserBalanceService } from 'src/app/core/services/user-balance.service';
import { CreditCardState, ICreditCard } from 'src/app/shared/state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  balance: number;

  @Select(CreditCardState.getAllCreditCards)
  creditCards$: Observable<ICreditCard[]>;

  constructor(
    private store: Store,
    private userBalanceService: UserBalanceService
  ) {}

  ngOnInit(): void {
    this.fetchUserBalance();
  }

  /**
   * Get the current user balance value
   */
  private fetchUserBalance(): void {
    this.balance = this.userBalanceService.userBalanceValue$.getValue();
  }
}
