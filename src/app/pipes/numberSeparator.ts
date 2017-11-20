import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'numberSeparator'})
export class NumberSeparator implements PipeTransform {
  transform(number = 0, separator = ','): any {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  }
}
