import { CreditCard, User } from '@core/model';

export interface PaymentForm {
  user: User;
  creditCards: CreditCard[];
}