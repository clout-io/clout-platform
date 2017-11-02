import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ApiService, BroadcastService } from '../../../services';
declare const $: any;

@Component({
  selector: 'app-ico-list',
  templateUrl: './ico-list.component.html',
  styleUrls: ['./ico-list.component.scss']
})
export class IcoListComponent implements OnInit, AfterViewInit {
  public icoList: Array<any>;
  public selectedId: string;
  private meta = {
    nextPage: 1,
    perPage: 20
  };

  constructor(private apiService: ApiService,
              private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.loadCoinList(true);
  }

  loadCoinList(isFirst = false) {
    const { nextPage, perPage } = this.meta;

    this.apiService.get(`/${this.apiService.icos}?page=${nextPage}&per_page=${perPage}`)
      .subscribe(responce => {
        if (isFirst) {
          this.meta = responce.meta;
          this.icoList = responce.data;
          this.loadCoin(this.icoList[0]['id']);
        } else {
          if (responce.meta.nextPage !== this.meta.nextPage) {
            this.meta = responce.meta;
            responce.data.map((item) => {
              this.icoList.push(item);
            });
          }
        }
      });
  }

  loadCoin(id) {
    if (!id)
      return false;

    this.selectedId = id;
    this.apiService.get(`/${this.apiService.ico}/${id}`)
      .subscribe(ico => {
        this.broadcastService.broadcast('icoInfo', ico);
      });
  }

  ngAfterViewInit(): void {
    const me = this;

    if (window.matchMedia("(min-width: 768px)").matches) {
      $('#altcoin-list-sticky').sticky({ topSpacing: 20, bottomSpacing: 0 });
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
    this.loadCoin(this.selectedId);

    setTimeout(() => {
      $('body, html').animate({
        scrollTop: 0
      }, 1000);
    }, 0);
  }
}
