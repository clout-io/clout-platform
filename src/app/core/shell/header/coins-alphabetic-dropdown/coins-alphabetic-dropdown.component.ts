import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from '../../../../services';

import { sortBy, compose, prop, toLower } from 'ramda';
declare const $: any;

@Component({
  selector: 'app-coins-alphabetic-dropdown',
  templateUrl: './coins-alphabetic-dropdown.component.html',
  styleUrls: ['./coins-alphabetic-dropdown.component.scss']
})
export class CoinsAlphabeticDropdownComponent implements OnInit {
  public alphabeticList = [];
  public defaultAlphabeticList = [];
  public filterValue: string;
  public showLettersList = true;

  constructor(private router: Router,
              private feedService: FeedService) { }

  ngOnInit() {
    const url = this.router.url;
    if (url === '/icos') {
      this.feedService.getIcosAlphabetic().take(1)
        .subscribe(data => this.initDropdown(data));
    } else {
      this.feedService.getAltcoinsAlphabetic().take(1)
        .subscribe(data => this.initDropdown(data));
    }
  }

  initDropdown(data: any): void {
    this.alphabeticList = this.parseList(data);
    this.defaultAlphabeticList = [...this.alphabeticList];
    this.addScrollToDropdown();
  }

  parseList(data) {
    const list = [];
    for (const i in data) {
      list.push({
        groupName: i,
        items: data[i]
      });
    }

    const sortByGroupName = sortBy(compose(toLower, prop('groupName')));
    return sortByGroupName(list);
  }

  addScrollToDropdown(): void {
    $('.coins-alphabetical-dropdown-list').mCustomScrollbar({
      scrollInertia: 200,
      mouseWheel: { preventDefault: false },
    });
  }

  sortByGroupName(letter: string) {
    this.alphabeticList = this.defaultAlphabeticList.filter((groupItem, i) => {
      return groupItem.groupName.indexOf(letter) !== -1;
    });
    this.showLettersList = false;
  }

}
