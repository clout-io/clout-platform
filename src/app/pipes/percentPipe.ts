import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'percentPipe'})
export class PercentPipe implements PipeTransform {
  transform(item: any): any {
    return item > 0 ? `+ ${item} %` : `- ${Math.abs(item)} %`;
  }
}
