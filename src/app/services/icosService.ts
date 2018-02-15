import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class IcosService {
  path = '/api/v1';

  categoriesFilter = [];

  constructor(
    private api: ApiService,
  ) {}

  setCategoriesFilter(categories: any) {
    this.categoriesFilter = categories;
  }

  getCategoriesFilter() {
    return this.categoriesFilter;
  }

  getFiltersStage(): Observable<any> {
    return this.api.get(`${this.path}/ico/filters/stage`);
  }

  getFiltersTokenType(): Observable<any> {
    return this.api.get(`${this.path}/ico/filters/tokentype`);
  }

  getFiltersTokenTechnology(): Observable<any> {
    return this.api.get(`${this.path}/ico/filters/tokentechnology`);
  }

  getFiltersIndustry(): Observable<any> {
    return this.api.get(`${this.path}/ico/filters/industry`);
  }

  getFiltersCategory(): Observable<any> {
    return this.api.get(`${this.path}/ico/filters/category`);
  }

  getCountries(): Observable<any> {
    return this.api.get(`${this.path}/countries`);
  }

  addIco(options: any): Observable<any> {
    return this.api.post(`${this.path}/ico`, options);
  }

  getIcosList(nextPage: number, perPage: number, filter: string, categories?: any): Observable<any> {
    let url = `${this.path}/icos?page=${nextPage}&per_page=${perPage}&sortType=asc&filter=${filter}`;
    return this.api.get(url)
      .do(responce => responce.data.map(ico => this.setIcoImageUrl(ico)));
  }

  getIco(id: string): Observable<any> {
    return this.api.get(`${this.path}/ico/${id}`)
      .do(ico => this.setIcoImageUrl(ico));
  }

  private setIcoImageUrl(ico: any): void {
    if (!ico.image) {
      ico.imageUrl = '';
    } else if (typeof ico.image === 'string') {
      ico.imageUrl = ico.image;
    } else if (typeof ico.image === 'object') {
      ico.imageUrl = environment.url + ico.image.url;
    }
  }

}
