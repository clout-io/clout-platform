import { Component, OnInit } from '@angular/core';
import { FeedService, FollowService } from '../../../../services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-fav-coin-list',
  templateUrl: './fav-coin-list.component.html',
  styleUrls: ['./fav-coin-list.component.scss']
})
export class FavCoinListComponent implements OnInit {
  public coinList;
  public inputValue: string;
  private selectedValue: string;

  constructor(
    private feedService: FeedService,
    private followService: FollowService,
  ) { }

  ngOnInit() {
    this.getFavoriteCoins();
  }

  getFavoriteCoins(): void {
    this.feedService.getFavoriteCoins().take(1)
      .subscribe(responce => this.coinList = responce.data);
  }

  selectValue(value: string): void {
    this.selectedValue = value;
  }

  getRemoteData(value: string): Observable<Response> {
    return this.feedService.searchAltcoin(value);
  }

  addCoinToFavorites(): void {
    if (!this.inputValue || this.inputValue.trim() === '') { return; }

    const value = this.inputValue.trim();
    const filteredValues = this.coinList.filter(item => item.id === value);
    if (!!filteredValues.length) { return; }

    this.followService.follow(this.inputValue.trim()).take(1)
      .subscribe((responce) => {
        this.getFavoriteCoins();
        this.selectedValue = null;
        this.inputValue = null;
      });
  }

}
