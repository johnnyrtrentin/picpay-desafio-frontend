import { CreditCard } from '@core/model/credit-card';
import { User } from '@core/model/user';

export interface PaymentData {
  user: User;
  creditCard: CreditCard
  value: number;
}