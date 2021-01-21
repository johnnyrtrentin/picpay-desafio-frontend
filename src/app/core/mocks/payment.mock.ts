import { of } from 'rxjs';
import { ICreditCard } from 'src/app/shared/state';
import {
  IPayment,
  ITransactionPayload,
} from 'src/app/shared/state/models/transactions.interface';

export const modalData: IPayment = {
  user: {
    id: 12,
    img: 'http://localhost:3000/images/person',
    name: 'Heisenberg',
    username: '@saymyname',
  },
  userCreditCards: [
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
    {
      card_number: '4111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
  ],
};

export const invalidCreditCard: ICreditCard = {
  cvv: 142,
  card_number: '4111111111111234',
  expiry_date: '01/18',
};

export const validCreditCard: ICreditCard = {
  cvv: 142,
  card_number: '1111111111111111',
  expiry_date: '01/18',
};

export const dialogRef = {
  close: () => false,
  beforeClosed: () => of({}),
};

export const validTransactionPayload: ITransactionPayload = {
  card_number: validCreditCard.card_number,
  cvv: validCreditCard.cvv,
  expiry_date: validCreditCard.expiry_date,
  value: 250,
  destination_user_id: modalData.user.id,
};

export enum FormErros  {
    MIN = 'min',
    REQUIRED = 'required',
    INSUFFICIENT_BALLANCE = 'insufficientBalance'
}
