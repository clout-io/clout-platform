import { Component, OnInit } from '@angular/core';
import { ApiService, BroadcastService } from '../../../services';

@Component({
  selector: 'app-altcoin-list',
  templateUrl: './altcoin-list.component.html',
  styleUrls: ['./altcoin-list.component.scss']
})
export class AltcoinListComponent implements OnInit {
  public url = '../../../assets/coin-img.png';
  public altcoinList;
  public selectedId: string;

  constructor(private apiService: ApiService,
              private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.apiService.get(`/${this.apiService.altcoins}`)
      .map(data => {
        return data.filter((item, i) => {
          return i < 9;
        });
      })
      .subscribe(altcoins => {
        this.altcoinList = altcoins;
        const firstAltcoin = this.altcoinList[0];
        this.selectedId = firstAltcoin.id;
        this.broadcastService.broadcast('altcoinInfo', firstAltcoin);
      });
  }

  onNotify(selectedId) {
    this.selectedId = selectedId;
  }

}
