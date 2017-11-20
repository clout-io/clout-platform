import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../../services/feed';

@Component({
  selector: 'app-fav-coin-list',
  templateUrl: './fav-coin-list.component.html',
  styleUrls: ['./fav-coin-list.component.scss']
})
export class FavCoinListComponent implements OnInit {
  public coinList;

  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit() {
    this.feedService.getFavoriteCoins()
      .subscribe(responce => this.coinList = responce);
  }

}
