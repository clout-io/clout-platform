import { Component, AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html'
})
export class CommunityComponent implements AfterViewInit {

  constructor() {
  }

  ngAfterViewInit() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      $('.feed-aside__item').stick_in_parent({
        offset_top: 20,
        parent: '.feed-content',
        recalc_every: 4
      });
    }
  }

}
