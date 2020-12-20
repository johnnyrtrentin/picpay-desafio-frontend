import { User, CreditCard } from '@core/model';

export interface PaymentData {
  user: User;
  creditCard: CreditCard
  value: number;
}