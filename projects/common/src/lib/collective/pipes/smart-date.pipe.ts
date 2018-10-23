import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'smartDate'
})
export class SmartDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      const datePipe = new DatePipe('en-US');

      if (new Date(value).getFullYear() ===  new Date().getFullYear()) {
          return datePipe.transform(value, 'MMM d');
      }

      return datePipe.transform(value, 'MMM d, y');
  }

}
