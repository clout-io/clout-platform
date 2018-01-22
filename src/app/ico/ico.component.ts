import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-ico',
  templateUrl: 'ico.component.html',
  styleUrls: ['ico.component.scss']
})
export class IcoComponent implements OnInit {

  constructor() { }

  optionsModel: number[];
  myOptions: IMultiSelectOption[];

  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    containerClasses: 'custom-multiple-select',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };

  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select services',
    allSelected: 'All selected',
  };

  ngOnInit() {
    this.myOptions = [
      { id: 1, name: 'Service 1' },
      { id: 2, name: 'Service 2' },
      { id: 3, name: 'Service 3' },
      { id: 4, name: 'Service 4' },
      { id: 5, name: 'Service 5' },
      { id: 6, name: 'Service 6' },
      { id: 7, name: 'Service 7' },
      { id: 8, name: 'Service 7' },
      { id: 9, name: 'Service 7' },
      { id: 10, name: 'Service 7' },
      { id: 11, name: 'Service 7' },
      { id: 12, name: 'Service 7' },
      { id: 13, name: 'Service 7' },
      { id: 14, name: 'Service 7' },
      { id: 15, name: 'Service 7' },
      { id: 16, name: 'Service 7' },
      { id: 17, name: 'Service 7' }
    ];
  }
  onChange() {
    console.log(this.optionsModel);
  }
}
