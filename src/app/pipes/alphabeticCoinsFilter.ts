import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'alphabeticCoinsPipe'})
export class AlphabeticCoinsPipe implements PipeTransform {
  transform(coinsList, filterValue: string): any {
    if (!filterValue) { return coinsList; }

    const newCoinsList = [];
    coinsList.forEach((groupItem, i) => {
      const filteredItems = groupItem.items.filter((item, value) => {
        return item.indexOf(filterValue) !== -1;
      });
      if (!!filteredItems.length) {
        newCoinsList.push({
          groupName: groupItem.groupName,
          items: filteredItems
        });
      }
    });
    return newCoinsList;
  }
}
