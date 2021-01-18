export class CreditCardStateModel {
    cards: ICreditCard[];
}

export interface ICreditCard {
    cvv: number;
    card_number: string;
    expiry_date: string;
}

export enum CreditCardStatus {
    VALID = 'valid',
    INVALID = 'invalid'
}
