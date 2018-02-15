import {Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
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

  public icoList: Array<any>;
  private slug: any = false;

  private subSlug$: any;
  private subRoute$: any;
  private follow$;
  private filterCategories$;

  @Output() isEmpty = new EventEmitter();

  private DEFAULT_TAB: string = 'all';
  private DEFAULT_STATUS: any = [ 'closed', 'upcoming', 'ongoing' ];

  private DEFAULT_META = { nextPage: 1, perPage: 20 };
  private meta = { nextPage: 1, perPage: 20 };

  constructor(private icosService: IcosService,
              private broadcastService: BroadcastService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.subSlug$ = this.broadcastService.subscribe('updateSelectedIco', (slug) => this.slug = slug );
    this.subRoute$ = this.route.params.subscribe(params => {
      if (params['status']) this.updateList(params['status']);
    });

    this.follow$ = this.broadcastService.subscribe('follow', coin => {
      coin.isFollow = !coin.isFollow;
      const index = this.icoList.findIndex(item => item.id === coin.id);
      if (coin.isFollow && index > 0) {
        const followedElement = this.icoList.splice(index, 1);
        this.icoList.unshift(...followedElement);
      }
    });

    this.filterCategories$ = this.broadcastService.subscribe('filterCategories', categories => {
      this.loadCoinList(true, () => {
        if (!!this.icoList.length) {
          this.onNotify(this.icoList[0].slug);
        }
      });
    });
  }

  updateList(status) {
    this.slug = false;
    const filter = R.contains(status, this.DEFAULT_STATUS) ? { status: status } : false;
    filter || status == this.DEFAULT_TAB ? this.loadCoinList(true) : this.toDefaultTab();
  }

  toDefaultTab() {
    this.slug = false;
    return this.router.navigate(['/icos', this.DEFAULT_TAB, this.slug ? this.slug : '']);
  }

  isEmptyList(isEmpty) {
    this.isEmpty.emit(isEmpty);
  }

  loadCoinList(isFirst = false, callback?: any) {
    const { nextPage, perPage } = isFirst ? this.DEFAULT_META : this.meta;
    const status = R.contains(this.route.snapshot.params.status, this.DEFAULT_STATUS) ? { status: this.route.snapshot.params.status } : false;
    const preFilter = {status: status ? status : {}};
    const categories = this.icosService.getCategoriesFilter();
    if (categories && categories.length) { preFilter['categories'] = {categories: categories}; }
    const filter = JSON.stringify(Object.assign({}, preFilter.status, preFilter['categories'],
      this.route.snapshot.queryParams));

    this.icosService.getIcosList(nextPage, perPage, filter).subscribe(responce => {
      if (isFirst) {
        this.meta = responce.meta;
        this.icoList = responce.data;

        if (!this.icoList.length) {
          this.slug = false;
          this.isEmptyList(true);
        }

        if (!this.slug && !!this.icoList.length) {
          const first = R.head(this.icoList) && R.head(this.icoList).slug ? R.head(this.icoList).slug : false;
          this.isEmptyList(false);
          this.router.navigate(['/icos', !status ? 'all' :
              this.route.snapshot.params.status, first ? first : '']);
        }
      } else {
        if (responce.meta.nextPage !== this.meta.nextPage) {
          this.meta = responce.meta;
          this.icoList = R.concat(this.icoList, responce.data);
        }
      }

      if (callback) { callback(); }
    }, error => this.router.navigate(['/icos', !status ? 'all' : this.route.snapshot.params.status, '']));
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
    this.subSlug$ && this.subSlug$.unsubscribe();
    this.subRoute$ && this.subRoute$.unsubscribe();
    if (this.follow$) { this.follow$.unsubscribe(); }
    if (this.filterCategories$) { this.filterCategories$.unsubscribe(); }
  }
}
