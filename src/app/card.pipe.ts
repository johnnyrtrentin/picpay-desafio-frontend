import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'card'
})
export class CardPipe implements PipeTransform {

  transform(value: string): string {
    return value.slice(-4)
  }

}
