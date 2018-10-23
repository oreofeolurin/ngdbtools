import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

    transform(value: string, expr: any, replaceValue: string): any {
        if (!replaceValue) { return value; }

        return value.replace(new RegExp(expr, 'gi'), replaceValue);
    }

}


