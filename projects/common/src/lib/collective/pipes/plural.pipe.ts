import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {

  transform(value: any, word: any, after?: string): any {
    return `${value} ${word}${ value !== 1 ? 's' : ''} ${after ? after : ''}`;
  }

}

