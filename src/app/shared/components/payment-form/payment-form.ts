import { CreditCard } from '@core/model/credit-card';
import { User } from '@core/model/user';

export interface PaymentForm {
  user: User;
  creditCards: CreditCard[];
}