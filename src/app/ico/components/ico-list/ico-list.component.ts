import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import { ApiService, BroadcastService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
declare const $: any;

@Component({
  selector: 'app-ico-list',
  templateUrl: './ico-list.component.html',
  styleUrls: ['./ico-list.component.scss']
})
export class IcoListComponent implements OnInit, AfterViewInit, OnDestroy {
  private follow$;
  public icoList: Array<any>;
  public selectedId: string;
  private meta = {
    nextPage: 1,
    perPage: 20
  };

  @Input() selected: boolean = false;

  constructor(private apiService: ApiService,
              private broadcastService: BroadcastService,
              private route: ActivatedRoute,
              private location: Location ) { }

  ngOnInit() {
    this.loadCoinList(true);

    this.follow$ = this.broadcastService.subscribe('follow', coin => {
      coin.isFollow = !coin.isFollow;
      const index = this.icoList.findIndex(item => item.id === coin.id);
      if (coin.isFollow && index > 0) {
        const followedElement = this.icoList.splice(index, 1);
        this.icoList.unshift(...followedElement);
      }
    });
  }

  loadCoinList(isFirst = false) {
    const { nextPage, perPage } = this.meta;
    const tab = this.route.snapshot.data.tab;
    const filter = tab !== 'all' ? JSON.stringify({status: tab}) : JSON.stringify({});

    const url = `/${this.apiService.icos}?page=${nextPage}&per_page=${perPage}&sortType=asc&filter=${filter}`;
    this.apiService.get(url)
      .subscribe(responce => {
        responce.data.map(item => item.imageUrl = environment.url + item.image);
        if (isFirst) {
          this.meta = responce.meta;
          this.icoList = responce.data;
          !this.selected && this.loadCoin(this.icoList[0]['id']);
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
        ico.imageUrl = environment.url + ico.image;
        this.broadcastService.broadcast('icoInfo', ico);
      });
  }

  ngAfterViewInit(): void {
    const me = this;

    if (window.matchMedia('(min-width: 768px)').matches) {
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
    this.selected && this.location.go("/icos/all");
    this.selectedId = selectedId;
    this.loadCoin(this.selectedId);

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
