import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { CardsService } from '../../cards/services/cards.service';
import { ICard } from '../../cards/interfaces/ICards';

import { TransactionsService } from '../../transactions/services/transactions.service';
import { IResponse } from '../../transactions/interfaces/IResponse';
import { ITransaction } from '../../transactions/interfaces/ITransaction';

import { UsersService } from '../services/users.service';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  users: Observable<IUser[]>;
  modalEnabled = new BehaviorSubject<boolean>(false);

  cards: ICard[];
 
  transaction = {
    currentUser: null,
    form: this.fb.group({
      card: [null, [Validators.required]],
      user_destination: ['', [Validators.required]],
      value: ['', [Validators.required]]
    }),
    status: false,
    error: false,
    message: ''
  };
 
  constructor(
    private usersService: UsersService, 
    private cardService: CardsService,
    private transactionService: TransactionsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.users = this.usersService.get();
    this.cards = this.cardService.get();
  }

  payUser(user: IUser) {
    this.transaction.currentUser = user;
    this.transaction.form.patchValue({ user_destination: user.id });
    this.modalEnabled.next(true);
  }

  handlePayment() {
    this.transaction.message = '';

    if (this.transaction.form.dirty && this.transaction.form.valid) {
      const card: ICard = this.transaction.form.get('card').value; 

      const transactionData: ITransaction = {
        ...card,
        user_destination: this.transaction.form.get('user_destination').value,
        value: this.transaction.form.get('value').value
      }

      this.transactionService.create(transactionData).subscribe((response: IResponse) =>  {
        this.modalEnabled.next(false);
        if (response.success) {
          this.transaction.message = 'O pagamento foi concluido com sucesso.';
        } else {
          this.transaction.error = true;
          this.transaction.message = 'O pagamento <strong>NÃO</strong> foi concluído com sucesso';
        }

        this.transaction.status = true;
        this.transaction.form.reset();
      });
    } else {
      this.transaction.error = true;
      this.transaction.message = 'Valor e/ou cartão inválidos';
    }
    
  }

  clear() {
    this.transaction.currentUser = null;
    this.transaction.error = false;
    this.transaction.status = false;
    this.transaction.message = '';
    this.transaction.form.reset();
    this.modalEnabled.next(false);
  }

}
