import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    const me = this;

    if (window.matchMedia("(min-width: 992px)").matches) {
      $('.feed-aside__item').stick_in_parent({
        offset_top: 20,
        parent: '.feed-content',
        recalc_every: 4
      })
    }

  }

  ngOnDestroy() { }
}