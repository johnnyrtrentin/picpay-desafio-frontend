import { ICard } from "../modules/cards/interfaces/ICards";

const cards: ICard[] = [    
    {
      card_number: '1111111111111111', // valid card
      cvv: 789,
      expiry_date: '01/18',
    },    
    {
      card_number: '4111111111111234', // invalid card
      cvv: 123,
      expiry_date: '01/20',
    },
];

export default cards;