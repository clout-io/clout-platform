import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ApiService, BroadcastService } from '../../../../services';

@Component({
  selector: 'app-altcoin-item',
  templateUrl: './altcoin-item.component.html',
  styleUrls: ['./altcoin-item.component.scss']
})
export class AltcoinItemComponent implements OnInit, OnDestroy {
  @Input() altcoin;
  @Input() selectItemId: string;
  @Output() notify = new EventEmitter<string>();
  private subscription: any;

  constructor(private apiService: ApiService,
              private broadcastService: BroadcastService) { }

  ngOnInit() {
  }

  selectItem(id: string) {
    this.notify.emit(id);
    this.apiService.get(`/${this.apiService.altcoin}/${id}`)
      .subscribe(altcoin => {
        this.broadcastService.broadcast('altcoinInfo', altcoin);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
