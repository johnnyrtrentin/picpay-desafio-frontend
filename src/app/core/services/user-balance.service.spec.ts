import { TestBed } from '@angular/core/testing';

import { UserBalanceService } from './user-balance.service';

describe('UserBalanceService', () => {
  let service: UserBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(UserBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the default balance value', () => {
    const currentUserBalanceValue = service.userBalanceValue$.getValue();
    expect(currentUserBalanceValue).toBe(6_000);
  });

  it('should update the balance value', () => {
    service.updateUserBalance(700);
    service.userBalanceValue$.subscribe((balanceValue) => {
      expect(balanceValue).toBe(5_300);
    });
  });
});
