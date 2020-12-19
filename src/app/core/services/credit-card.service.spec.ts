import { TestBed } from '@angular/core/testing';

import { CreditCardService } from './credit-card.service';
import { CreditCard } from '@core/model/credit-card';

describe('CreditCardService', () => {

  let service: CreditCardService;

  beforeEach(() => TestBed.configureTestingModule({}));
  
  beforeEach(() => {
    service = TestBed.get(CreditCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return credit card list', () => {
    const creditCards: CreditCard[] = [
      {
        card_number: '1111111111111111',
        cvv: 789,
        expiry_date: '01/18',
      },
      {
        card_number: '4111111111111234',
        cvv: 123,
        expiry_date: '01/20',
      }
    ];

    expect(service.getCards()).toEqual(creditCards);
  });
});
