import {Directive, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import {BroadcastService} from "../../services/broadcastService";
@Directive({
  selector: '[appFoo]'
})
export class FooDirective implements OnInit, OnDestroy {
  sub1$: any;
  sub2$: any;

  constructor(private _view: ViewContainerRef,
              private broadcastService: BroadcastService) {
  }

  ngOnInit() {
    this.sub1$ = this.broadcastService.subscribe('addCategoryToSelect', (value) => {
      const component = (<any>this._view['_data'].componentView.component);
      component.setSelected(new MouseEvent('click'), value);
      component.clearSearch(new MouseEvent('click'));
      this.updateMultiSelectTitle(component);
    });

    this.sub2$ = this.broadcastService.subscribe('updateCategoryTitle', (value) => {
      const component = (<any>this._view['_data'].componentView.component);
      this.updateMultiSelectTitle(component);
    });
  }

  updateMultiSelectTitle(componentObj: any): void {
    setTimeout(() => {
      const selectedItemsIds = {};
      componentObj.model.map(item => {
        const v = item.trim();
        if (v.length > 0) { selectedItemsIds[v] = v; }
      });
      const selectedItems = componentObj.options.filter(item => {
        return !!selectedItemsIds[item.id];
      });
      const items = [];
      selectedItems.map(item => items.push(item.name));
      if (!items.length) {
        componentObj.title = 'Select Category';
      } else {
        componentObj.title = items.length < 4 ? items.join(', ') :
          `Selected ${items.length} items`;
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }

}
