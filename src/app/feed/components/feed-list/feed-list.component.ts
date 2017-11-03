import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FeedService, BroadcastService } from '../../../services';


@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html'
})
export class FeedListComponent implements OnInit, OnDestroy {
  public feeds = [];
  private subscription: any;
  private meta = { nextPage: 1, perPage: 10 };

  constructor(private feedService: FeedService, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe('updateNewsList', (response) => {
      this.loadFeedList(true)
    });

    this.loadFeedList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadFeedList(forse = false) {
    if (forse) {
      this.feeds = [];
      this.meta = { nextPage: 1, perPage: 10 };
    }

    this.feedService.getFeeds(this.meta)
    .subscribe(responce => {
      if (responce.page === 1 || responce.meta.nextPage) {
        this.meta = responce.meta;
        responce.data.map((item) => {
          this.feeds.push(item);
        });
      }
    });
  }
}
