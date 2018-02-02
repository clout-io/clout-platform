import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { BroadcastService, IcosService } from '../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
declare const $: any;

@Component({
  selector: 'app-ico-list',
  templateUrl: './ico-list.component.html',
  styleUrls: ['./ico-list.component.scss']
})
export class IcoListComponent implements OnInit, AfterViewInit, OnDestroy {
  private follow$;
  public icoList: Array<any>;
  @Input() selectedId: string;

  private sub: any;
  private icoId: string;
  private DEFAULT_TAB: string = 'all';
  private DEFAULT_STATUS: any = [ 'closed', 'upcoming', 'ongoing' ];

  private meta = {
    nextPage: 1,
    perPage: 20
  };

  @Input() selected: boolean = false;

  constructor(private icosService: IcosService,
              private broadcastService: BroadcastService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => { this.icoId = params['id']; });
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

    const status = R.contains(this.route.snapshot.params.status, this.DEFAULT_STATUS) ? { status: this.route.snapshot.params.status } : false;
    const filter = JSON.stringify(Object.assign({}, (status ? status : {}), this.route.snapshot.queryParams));

    this.icosService.getIcosList(nextPage, perPage, filter).subscribe(responce => {
      if (isFirst) {
        this.meta = responce.meta;
        this.icoList = responce.data;
        !this.icoId && !!this.icoList.length && this.router.navigate(['/icos', !status ? 'all' : this.route.snapshot.params.status, R.head(this.icoList).id], {queryParams : this.route.snapshot.queryParams});
      } else {
        if (responce.meta.nextPage !== this.meta.nextPage) {
          this.meta = responce.meta;
          this.icoList = R.concat(this.icoList, responce.data);
        }
      }
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
    const status = this.route.snapshot.params.status || this.DEFAULT_TAB;
    this.router.navigate(['/icos', status, selectedId], {queryParams : this.route.snapshot.queryParams});

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
