import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class FollowService {
  private path = '/api/v1/';
  constructor (
    private api: ApiService
  ) {}

  follow (id: string): Observable<any> {
    return this.api.post(`${this.path}follow/${id}`, {id});
  }
}
