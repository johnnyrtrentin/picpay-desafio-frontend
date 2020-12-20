import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';

describe('AccountService', () => {

  let service: AccountService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    
    service = TestBed.get(AccountService);
  });

  it('should be created', () => {  
    expect(service).toBeTruthy();
  });

  it('should update balance', (done) => {
    service.updateBalance(500);

    service.balance$.subscribe((value: number) => {
      expect(value).toEqual(1000);
      done();
    });
  });
});
