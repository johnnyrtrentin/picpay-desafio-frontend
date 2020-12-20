import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private balance = new BehaviorSubject<number>(1500);
  readonly balance$ = this.balance.asObservable();

  constructor() { }
  
  updateBalance(value: number) {
    const newBalance = this.balance.value - value;
    this.balance.next(newBalance);
  }
}
