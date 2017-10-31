import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcastService } from '../../../../services';

@Component({
  selector: 'app-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.scss']
})
export class FeatureDetailComponent implements OnInit, OnDestroy {
  private subscription: any;
  public altcoin: any;

  constructor(private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe(
      'altcoinInfo', (altcoin) => {
        this.altcoin = altcoin;
      });
  }

  subscribe() {
    this.broadcastService.broadcast('showPopup', 'popupCheckAccess');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
