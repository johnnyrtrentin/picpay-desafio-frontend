import { IUsers } from './users.interface';
import { ICreditCard } from './credit-card.interface';

export class TransactionsStateModel {
    transactions: ITransactionsModel[];
}

export interface ITransactionsModel {
    paymentValue: number;
    paymentUser: string;
}

export interface IPayment {
    user: IUsers;
    userCreditCards: ICreditCard[];
}

export interface ITransactionPayload extends ICreditCard {
    value: number;
    destination_user_id: number;
}
