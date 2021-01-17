export class CreditCardStateModel {
    cards: ICreditCard[];
}

export interface ICreditCard {
    cvv: number;
    card_number: string;
    expiry_date: string;
}

