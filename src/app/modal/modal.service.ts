import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Card } from "src/models/card";

@Injectable({ providedIn: 'root' })
export class ModalService {
  
  constructor(private http: HttpClient) {}

  pay(userId: number, value: { value: string; selectedCard: Card; } ) {
    return this.http
      .post(
          'https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989',
          {
              card_number: value.selectedCard.card_number,
              cvv: value.selectedCard.cvv,
              expiry_date: value.selectedCard.expiry_date,
              destination_user_id: userId,
              value: value.value,
          }
      );
  }

  getCards(): Card[] {
    return [      
      {
        card_number: '1111111111111111',
        cvv: 789,
        expiry_date: '01/18',
      },      
      {
        card_number: '4111111111111234',
        cvv: 123,
        expiry_date: '01/20',
      },
    ];
  }
}