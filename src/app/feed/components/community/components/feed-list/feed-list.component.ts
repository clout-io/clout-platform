import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FeedService, BroadcastService } from '../../../../../services';
import * as R from 'ramda';


@Component({
  selector: 'app-feed-list',
  templateUrl: 'feed-list.component.html'
})
export class FeedListComponent implements OnInit, OnDestroy {
  public feeds = [];
  private subscription: any;
  private meta = { nextPage: 1, perPage: 10 };

  constructor(private feedService: FeedService, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe('updateNewsList', (response) => {
      this.loadFeedList(true);
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
    .subscribe(response => {
      this.feeds = response.meta.page === 1 ? response.data : R.unionWith(R.eqBy(R.prop('id')), this.feeds, response.data);
      this.meta = response.meta.nextPage ? response.meta : this.meta;
      /*this.feeds = response.meta.page === 1 ? response.data : R.uniq([...this.feeds, ...response.data]);
      this.meta = response.meta.nextPage ? response.meta : this.meta;*/
    });
  }

  deletePost(id: string): void {
    const index = this.feeds.findIndex((item) => item.id === id);
    this.feeds.splice(index, 1);
  }
}
