import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBalanceService {
  public userBalanceValue$ = new BehaviorSubject<number>(6_000);

  constructor() { }
}
