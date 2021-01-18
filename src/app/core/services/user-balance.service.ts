import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBalanceService {
  public userBalanceValue$ = new BehaviorSubject<number>(6_000);

  constructor() { }

  /**
   * Update the balance value of the current user.
   * @param value Value to disccount to user balance
   */
  public updateUserBalance(value: number): void {
    const currentBalanceValue = this.userBalanceValue$.getValue();
    this.userBalanceValue$.next(currentBalanceValue - value);
  }
}
