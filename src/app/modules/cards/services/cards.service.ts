import { Injectable } from '@angular/core';
import { ICard } from '../interfaces/ICards';
import cards from 'src/app/__mocks__/cards';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor() { }


  get(): ICard[] {
    return cards;
  }

  validate(input, N) {
  var regex = new RegExp("(\\d)\\1{" + N + "}", "g");
  
  return !!input.match(regex);
}
}
