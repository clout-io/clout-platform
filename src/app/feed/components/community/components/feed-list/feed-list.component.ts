import {Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import { FeedService, BroadcastService } from '../../../../../services';
import * as R from 'ramda';

@Component({
  selector: 'app-feed-list',
  templateUrl: 'feed-list.component.html'
})
export class FeedListComponent implements OnInit, OnChanges, OnDestroy {
  public feeds = [];
  @Input() filter: string;
  private subscription: any;
  private categories$: any;
  public categories;
  private meta = { nextPage: 1, perPage: 10 };
  public notfound = false;

  constructor(private feedService: FeedService, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe('updateNewsList', (response) => {
      this.loadFeedList(true);
    });
    this.categories$ = this.feedService.getCategories()
      .subscribe(res => this.categories = res);

    this.loadFeedList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['filter'] && !changes['filter']['firstChange']) {
      this.loadFeedList(true);
    }
  }

  private updateList() {
    this.subscription = this.broadcastService.subscribe('updateNewsList', (response) => {
      this.loadFeedList(true);
    });
  }

  loadFeedList(forse = false) {
    if (forse) {
      this.feeds = [];
      this.meta = { nextPage: 1, perPage: 10 };
    }

    if (!this.meta.nextPage) { return; }

    this.feedService.getFeeds({...this.meta, filter: this.filter})
    .subscribe(response => {
      this.feeds = response.meta.page === 1 ? response.data : R.unionWith(R.eqBy(R.prop('id')), this.feeds, response.data);
      this.meta = response.meta;
      this.notfound = !this.feeds.length;
    });
  }

  deletePost(id: string): void {
    const index = this.feeds.findIndex((item) => item.id === id);
    this.feeds.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.categories$.unsubscribe();
  }
}
