import {
  ITransactionPayload,
  ITransactionsModel,
} from 'src/app/shared/state/models/transactions.interface';

export const API_ENDPOINT_MOCK =
  'https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989';

export interface ITransactionService {
  success: boolean;
  status: string;
}

export const transactionPayload: ITransactionPayload = {
  card_number: '123131221321',
  cvv: 123,
  expiry_date: '11/11',
  value: 250,
  destination_user_id: 123,
};

export const response = {
  success: true,
  status: 'Aprovada',
};

export const defaultState = {
  transactions: [],
};

export const dispatchValues: ITransactionsModel[] = [
  {
    paymentValue: 5_000,
    paymentUser: 'Johnny',
  },
  {
    paymentValue: 3_150,
    paymentUser: 'Robert',
  },
  {
    paymentValue: 1_250,
    paymentUser: 'Trentin',
  },
];

export const stateWithDispatchedValues = {
  transactions: dispatchValues
};
