/**
 * Created by ivan on 09.11.17.
 */
import { Pipe } from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncatePipe {
  transform(value = '', count) : string {
    let limit = count ? parseInt(count) : 10;
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
