import { Component, OnInit } from '@angular/core';

import { AccountService } from '@core/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  balance: number;

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.accountService.balance$.subscribe((value: number) => {
      this.balance = value;
    });
  }

}
