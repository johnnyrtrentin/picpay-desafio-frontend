import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/state/services/transactions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public transactionService: TransactionsService) { }

  ngOnInit(): void { }

}
