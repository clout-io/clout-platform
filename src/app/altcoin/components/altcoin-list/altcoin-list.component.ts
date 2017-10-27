import { Component, OnInit } from '@angular/core';
import { ApiService, BroadcastService } from '../../../services';
declare const $: any;

@Component({
  selector: 'app-altcoin-list',
  templateUrl: './altcoin-list.component.html',
  styleUrls: ['./altcoin-list.component.scss']
})
export class AltcoinListComponent implements OnInit {
  public url = '../../../assets/coin-img.png';
  public altcoinList;
  public selectedId: string;
  private meta = {
    nextPage: 1,
    perPage: 20
  };

  constructor(private apiService: ApiService,
              private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.apiService.get(`/${this.apiService.altcoins}?page=1&per_page=20`)
      .subscribe(responce => {
        this.meta = responce.meta;
        this.altcoinList = responce.data;
        const firstAltcoin = this.altcoinList[0];
        this.selectedId = firstAltcoin.id;
        this.apiService.get(`/${this.apiService.altcoin}/${firstAltcoin.id}`)
          .subscribe(altcoin => {
            this.broadcastService.broadcast('altcoinInfo', altcoin);
          });
      });

    $('#sticky-item').on('sticky-bottom-reached', ($event) => {
      $event.stopPropagation();
      let {nextPage, perPage} = this.meta;
      this.apiService.get(`/${this.apiService.altcoins}?page=${nextPage}&per_page=${perPage}`)
        .subscribe(responce => {
          if (responce.meta.nextPage !== this.meta.nextPage) {
            this.meta = responce.meta;
            responce.data.map((item) => {
              this.altcoinList.push(item);
            });
            $('#sticky-item').sticky('update');
          }
        });
    });
  }

  onNotify(selectedId) {
    this.selectedId = selectedId;
  }

}
