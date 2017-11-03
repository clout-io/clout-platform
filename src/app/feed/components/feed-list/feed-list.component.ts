import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FeedService, BroadcastService } from '../../../services';


@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html'
})
export class FeedListComponent implements OnInit, OnDestroy {
  public feeds;
  private subscription: any;
  private meta = { nextPage: 1, perPage: 20 };

  constructor(private feedService: FeedService, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe(
      'updateNewsList', (response) => { this.loadFeedList(); });

    this.loadFeedList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadFeedList() {
    const { nextPage, perPage } = this.meta;
    this.feedService.getFeeds()
      .subscribe(responce => {
        this.feeds = responce.data;
    });

    // this.apiService.get(`/${this.apiService.altcoins}?page=${nextPage}&per_page=${perPage}`)
    //   .subscribe(responce => {
    //     if (isFirst) {
    //       this.meta = responce.meta;
    //       this.altcoinList = responce.data;
    //       this.loadCoin(this.altcoinList[0]['id']);
    //     } else {
    //       if (responce.meta.nextPage !== this.meta.nextPage) {
    //         this.meta = responce.meta;
    //         responce.data.map((item) => {
    //           this.altcoinList.push(item);
    //         });
    //       }
    //     }
    //   });
  }
}
