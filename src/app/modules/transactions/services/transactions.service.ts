import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ITransaction } from '../interfaces/ITransaction';
import { IResponse } from '../interfaces/IResponse';
import { CardsService } from '../../cards/services/cards.service';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService { 

  constructor(private httpClient: HttpClient, private cardService: CardsService) {}
 
  create(transaction: ITransaction): Observable<IResponse> {

    // validaçao fake para invalidar cartão
    if (!this.cardService.validate(transaction.card_number, 14)) {
      return of({
        success: false,
        status: 'Cartão inválido',
      })
    } else {
      return this.httpClient
        .post<IResponse>(`https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989`, transaction);
    }

    
  }
}
