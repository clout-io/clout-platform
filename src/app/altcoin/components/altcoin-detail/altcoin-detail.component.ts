import { Component, OnInit,  OnDestroy } from '@angular/core';
import { BroadcastService } from '../../../services';

@Component({
  selector: 'app-altcoin-detail',
  templateUrl: './altcoin-detail.component.html',
  styleUrls: ['./altcoin-detail.component.scss']
})
export class AltcoinDetailComponent implements OnInit, OnDestroy {
  private subscription: any;
  public altcoin: any;

  constructor(private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe(
      'altcoinInfo', (altcoin) => {
        this.altcoin = altcoin;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
