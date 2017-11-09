/**
 * Created by ivan on 09.11.17.
 */
import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../../../services';
import * as R from 'ramda';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html'
})
export class NewsListComponent implements OnInit {
  public news = [];
  private meta = { nextPage: 1, perPage: 20 };

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.loadNewsList();
  }

  loadNewsList() {
    this.feedService.getNews(this.meta)
      .subscribe(response => {
        this.news = response.page === 1 ? response.data : R.uniq([...this.news, ...response.data]);
        this.meta = response.meta.nextPage ? response.meta : this.meta;
      });
  }
}
