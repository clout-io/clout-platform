/**
 * Created by ivan on 03.11.17.
 */

import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class FeedService {
  path = '/api/v1';

  constructor(
    private api: ApiService,
  ) {}

  getFeeds(options): Observable<any> {
    return this.api.get(this.toFormFeedsUrl(options))
      .map((res: any) => res);
  }

  toFormFeedsUrl(options): string {
    const { nextPage, perPage, filter } = options;
    const partUrl = `${this.path}/news?page=${nextPage}&per_page=${perPage}`;
    return filter ? `${partUrl}&tag=${filter}` : partUrl;
  }

  feedCreate(feed): Observable<any> {
    return this.api.post(`${this.path}/news/create`, feed)
      .map((res: any) => res);
  }

  loadImage(img): Observable<any> {
    return this.api.image(`${this.path}/img/upload`, img)
      .map((res: any) => res);
  }

  editFeed(id: string, options: any): Observable<any> {
    return this.api.post(`${this.path}/news/${id}`, options);
  }

  deleteFeed(id: string): Observable<any> {
    return this.api.delete(`${this.path}/news/${id}`, {postId: id});
  }

  getNews(options): Observable<any> {
    let { nextPage, perPage } = options;
    return this.api.get(`${this.path}/press?page=${nextPage}&per_page=${perPage}`)
      .map((res: any) => res);
  }

  getFavoriteCoins(): Observable<any> {
    return this.api.get(`${this.path}/altcoins/favorites/`);
  }

  urlInfo(url: string): Observable<any> {
    return this.api.get(`${this.path}/url/og?url=${url}`);
  }
}
