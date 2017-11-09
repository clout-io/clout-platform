import { Component, OnInit, OnDestroy } from '@angular/core';

declare const $: any;
import NProgress from 'nprogress';
import { BroadcastService } from '../../../services';

@Component({
  selector: 'app-loader-line',
  templateUrl: './loader-line.component.html',
  styleUrls: ['./loader-line.component.scss']
})
export class LoaderLineComponent implements OnInit, OnDestroy {
  private loader$;

  constructor(private broadcastService: BroadcastService) { }

  ngOnInit() {
    NProgress.configure({ showSpinner: false, parent: '.header_loader', easing: 'ease', speed: 500 });
    $('.header_loader').sticky({ topSpacing: 0});

    this.loader$ = this.broadcastService.subscribe('showLoaderLine', show => {
      this.showLoader(show);
    });
  }

  showLoader(show: boolean) {
    if (show) { NProgress.start(); }
    else { NProgress.done(true); }
  }

  ngOnDestroy(): void {
    this.loader$.unsubscribe();
  }

}
