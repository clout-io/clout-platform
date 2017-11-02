import { Component, OnInit, OnDestroy } from '@angular/core';
declare const $;

import { BroadcastService } from '../../../services';

@Component({
  selector: 'app-ico-detail',
  templateUrl: './ico-detail.component.html',
  styleUrls: ['./ico-detail.component.scss']
})
export class IcoDetailComponent implements OnInit, OnDestroy {
  ico: Object = {};
  subscription: any;

  constructor(private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe('icoInfo', (icoData) => {
      this.ico = icoData;
      this.ico['description'] =  $(this.ico['description']).text();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
