import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class IcosService {
  path = '/api/v1';

  constructor(
    private api: ApiService,
  ) {}

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

}
