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

}
