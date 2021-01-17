import { ICreditCard, IUsers } from '../state';

export interface IPayment {
    user: IUsers;
    userCreditCards: ICreditCard[];
}
