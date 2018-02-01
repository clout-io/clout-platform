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
    let partUrl = `${this.path}/news?page=${nextPage}&per_page=${perPage}`;

    if (!!filter) {
      for (const i in filter) {
        partUrl += !!filter[i] ? `&${i}=${filter[i]}` : '';
      }
    }
    return partUrl;
  }

  feedCreate(feed): Observable<any> {
    return this.api.post(`${this.path}/news/create`, feed)
      .map((res: any) => res);
  }

  loadImage(img): Observable<any> {
    return this.api.image(`${this.path}/img/upload`, img)
      .map((res: any) => res);
  }

  getFeed(id: string): Observable<any> {
    return this.api.get(`${this.path}/news/${id}`);
  }

  getIcosAlphabetic(): Observable<any> {
    return this.api.get(`${this.path}/icos/alpha`);
  }

  getAltcoinsAlphabetic(): Observable<any> {
    return this.api.get(`${this.path}/altcoins/alpha`);
  }

  getTopCoins(icosOrAltcoins = 'altcoins', top: number): Observable<any> {
    return this.api.get(`${this.path}/${icosOrAltcoins}/top?top=${top}`);
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

  getCategories(): Observable<any> {
    return this.api.get(`${this.path}/categories`);
  }

  getTrendings(options): Observable<any> {
    const { nextPage, perPage } = options;
    return this.api.get(`${this.path}/treadings?page=${nextPage}&per_page=${perPage}`);
  }

  searchAltcoin(term: string): Observable<any>  {
    return this.api.get(`${this.path}/altcoins/search?term=${term}`);
  }

  searchTag(term: string): Observable<any>  {
    return this.api.get(`${this.path}/tag/search?term=${term}`);
  }

  getFavoritesAltcoins(options): Observable<any>  {
    const { nextPage, perPage } = options;
    return this.api.get(`${this.path}/altcoins/favorites/?page=${nextPage}&per_page=${perPage}`);
  }
}
