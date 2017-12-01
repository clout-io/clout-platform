import { Component, AfterViewInit} from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements AfterViewInit {

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
