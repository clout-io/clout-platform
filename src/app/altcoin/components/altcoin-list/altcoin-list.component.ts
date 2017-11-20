import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ApiService, BroadcastService } from '../../../services';
declare const $: any;

@Component({
  selector: 'app-altcoin-list',
  templateUrl: './altcoin-list.component.html',
  styleUrls: ['./altcoin-list.component.scss']
})
export class AltcoinListComponent implements OnInit, OnDestroy, AfterViewInit {
  private follow$;
  public url = '../../../assets/coin-img.png';
  public altcoinList;
  public selectedId: string;
  private meta = { nextPage: 1, perPage: 20};

  constructor(private apiService: ApiService,
              private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.loadCoinList(true);

    this.follow$ = this.broadcastService.subscribe('follow', coin => {
      coin.isFollow = !coin.isFollow;
      const index = this.altcoinList.findIndex(item => item.id === coin.id);
      if (coin.isFollow && index > 0) {
        const followedElement = this.altcoinList.splice(index, 1);
        this.altcoinList.unshift(...followedElement);
      }
    });
  }

  loadCoinList(isFirst = false) {
    const { nextPage, perPage } = this.meta;

    this.apiService.get(`/${this.apiService.altcoins}?page=${nextPage}&per_page=${perPage}`)
      .subscribe(responce => {
        if (isFirst) {
          this.meta = responce.meta;
          this.altcoinList = responce.data;
          this.loadCoin(this.altcoinList[0]['id']);
        } else {
          if (responce.meta.nextPage !== this.meta.nextPage) {
            this.meta = responce.meta;
            responce.data.map((item) => {
              this.altcoinList.push(item);
            });
          }
        }
      });
  }

  loadCoin(id) {
    if (!id)
      return false;

    this.selectedId = id;
    this.apiService.get(`/${this.apiService.altcoin}/${id}`)
      .subscribe(altcoin => {
        this.broadcastService.broadcast('altcoinInfo', altcoin);
      });
  }

  ngAfterViewInit(): void {
    const me = this;

    if (window.matchMedia("(min-width: 768px)").matches) {
      $('#altcoin-list-sticky').sticky({ topSpacing: 0, bottomSpacing: 31 });
    } else {
      $('#altcoin-list-sticky').unstick();
    }

    $('#altcoin-list-scroll').mCustomScrollbar({
      scrollInertia: 200,
      mouseWheel:{ preventDefault: false },
      callbacks:{ onTotalScroll: function() { me.loadCoinList(); }}
    });
  }

  onNotify(selectedId) {
    this.selectedId = selectedId;

    setTimeout(() => {
      $('body, html').animate({
        scrollTop: 0
      }, 1000);
    }, 0);
  }

  ngOnDestroy(): void {
    this.follow$.unsubscribe();
  }
}
