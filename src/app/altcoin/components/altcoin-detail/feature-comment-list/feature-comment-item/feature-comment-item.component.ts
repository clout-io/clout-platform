import { Component, OnInit, OnDestroy } from '@angular/core';

import { ApiService, BroadcastService } from '../../../../../services';

@Component({
  selector: 'app-feature-comment-item',
  templateUrl: './feature-comment-item.component.html',
  styleUrls: ['./feature-comment-item.component.scss']
})
export class FeatureCommentItemComponent implements OnInit, OnDestroy {
  subscription: any;
  coinData: any;

  constructor(private apiService: ApiService,
              private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe(
      'altcoinInfo', (altcoin) => this.coinData = altcoin);
  }

  like(label) {
    this.apiService.post(`/${this.apiService.like_url + '/' + this.coinData.id}`, {
      objectId: this.coinData.id
    })
      .subscribe(data => {
        console.log('data', data);
      }, error => {
        console.log('error', error);
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
