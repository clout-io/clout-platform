import {Component, OnInit, AfterViewChecked, AfterViewInit} from '@angular/core';
import { FeedService, FollowService } from '../../../../services';

import { unionWith, eqBy, prop } from 'ramda';
declare const $: any;

@Component({
  selector: 'app-fav-coin-list',
  templateUrl: './fav-coin-list.component.html',
  styleUrls: ['./fav-coin-list.component.scss']
})
export class FavCoinListComponent implements OnInit, AfterViewChecked {
  public coinList;
  public showAddCoinInput: boolean;
  private meta = { nextPage: 1, perPage: 5};

  constructor(
    private feedService: FeedService,
    private followService: FollowService,
  ) { }

  ngOnInit() {
    this.loadFavoriteCoins(true);
  }

  addCoinEvent(data): void {
    const filteredValues = this.coinList.filter(item => item.id === data.value);
    if (!!filteredValues.length) { return; }

    this.followService.follow(data.value).take(1)
      .subscribe((responce) => {
        this.showAddCoinInput = false;
        data.hideInput();
        this.loadFavoriteCoins(true, () => {
          $('.fav-coin-list--scrollable').mCustomScrollbar('scrollTo', 'top', '0px');
        });
      });
  }

  ngAfterViewChecked() {
    $('.fav-coin-list--scrollable').mCustomScrollbar({
       scrollInertia: 200,
       mouseWheel: { preventDefault: false },
       callbacks: { onTotalScroll: () => { this.loadFavoriteCoins(); }}
    });
  }

  loadFavoriteCoins(isFirst = false, callback = null) {
    if (isFirst) {
      this.meta = { nextPage: 1, perPage: 5};
    }

    if (!this.meta.nextPage) { return; }

    const { nextPage, perPage } = this.meta;

    this.feedService.getFavoritesAltcoins({nextPage, perPage})
      .subscribe(response => {
        if (!response) { return; }

        this.coinList = response.meta.page === 1 ? response.data :
          unionWith(eqBy(prop('id')), this.coinList, response.data);
        this.meta = response.meta;

        if (callback) {
          callback();
        }
      });
  }

}
