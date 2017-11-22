import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../../services';
import * as R from 'ramda';

@Component({
  selector: 'app-trending-list',
  templateUrl: './trending-list.component.html',
  styleUrls: ['./trending-list.component.scss']
})
export class TrendingListComponent implements OnInit {
  public trendings = [];
  public categories = [];
  private meta = { nextPage: 1, perPage: 10 };

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.getCategories().take(1)
      .subscribe(res => this.categories = res);
    this.loadTrendingsList();
  }

  loadTrendingsList(forse = false) {
    if (forse) {
      this.trendings = [];
      this.meta = { nextPage: 1, perPage: 10 };
    }

    if (!this.meta.nextPage) { return; }

    this.feedService.getTrendings(this.meta).take(1)
      .subscribe(response => {
        this.trendings = response.meta.page === 1 ? response.data :
          R.unionWith(R.eqBy(R.prop('id')), this.trendings, response.data);
        this.meta = response.meta;
      });
  }

  deletePost(id: string): void {
    const index = this.trendings.findIndex((item) => item.id === id);
    this.trendings.splice(index, 1);
    if (this.trendings.length < 2) {
      const nextPage = this.meta.nextPage === 1 ? 1 : !this.meta.nextPage ? this.meta.nextPage : this.meta.nextPage - 1;
      this.meta = Object.assign({}, this.meta, {nextPage});
      this.loadTrendingsList();
    }
  }

}
