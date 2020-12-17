import { Component, OnInit } from '@angular/core';

import { User } from '@core/model/user';
import { PaymentsService } from './shared/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit() {

  }

  payUser(user: User) {
    // TODO abrir modal
  }
}
