export interface ITransaction {
    card_number: string;
    cvv: number;
    expiry_date: string;  
    user_destination: number | string;
    value: number;
  }
  