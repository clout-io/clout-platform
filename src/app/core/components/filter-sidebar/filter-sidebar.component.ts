import { Component, OnInit } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {IcosService} from '../../../services/icosService';
import {BroadcastService} from '../../../services/broadcastService';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent implements OnInit {
  filtersForm: FormGroup;
  LIMIT_CATEGORIES = 12;
  limitCategoriesTo = this.LIMIT_CATEGORIES;
  lastCheckedCategories = [];
  initialPosition = [0, 5000];

  defaultOptions: FlatpickrOptions = {
    dateFormat: 'm/d/Y',
    mode: 'range',
    plugins: [rangePlugin({ input: '#secondRangeInput' })]
  };

  constructor(private formBuilder: FormBuilder,
              private icosService: IcosService,
              private broadcastService: BroadcastService) {}

  sliderChange(i){
    console.log(i);
  }

  ngOnInit() {
    this.filtersForm = this.formBuilder.group({
      'categories': this.formBuilder.array([]),
      //'single': new FormControl([0, 5000])
    });

    this.icosService.getFiltersCategory().take(1)
      .subscribe(res => {
        const categories = this.filtersForm.get('categories') as FormArray;
        res.forEach(item => categories.push(this.createCategoryItem(item)));

        this.filtersForm.controls.categories.valueChanges
          .debounceTime(700)
          .subscribe(values => {
            const checkedCategories = [];
            values.forEach(item => {
              const {id} = item.checkbox;
              const checked = item[id];
              if (checked) { checkedCategories.push(id); }
            });
            this.icosService.setCategoriesFilter(checkedCategories);
            if (!!checkedCategories.length) {
              this.broadcastService.broadcast('filterCategories', checkedCategories);
              this.lastCheckedCategories = checkedCategories;
            } else if (!!this.lastCheckedCategories.length) {
              this.broadcastService.broadcast('filterCategories', checkedCategories);
            }
        });
      });
  }

  createCategoryItem(item: any): FormGroup {
    const {name, id} = item;
    const obj = {checkbox: {name, id}};
    obj[id] = false;
    return this.formBuilder.group(obj);
  }

  moreOrLessCategories() {
    this.limitCategoriesTo = this.limitCategoriesTo === this.LIMIT_CATEGORIES ?
      this.filtersForm.get('categories')['controls'].length : this.LIMIT_CATEGORIES;
  }

}
