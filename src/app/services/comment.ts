/**
 * Created by ivan on 31.10.17.
 */

import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CommentService {
  path = '/api/v1';

  constructor(
    private api: ApiService,
  ) {}

  getComments(objectId): Observable<any> {
    return this.api.get(`${this.path}/comments/${objectId}`)
      .map((res: any) => res);
  }

  addComment(objectId, text): Observable<any> {
    return this.api.post(`${this.path}/comment/${objectId}`, {text: text})
      .map((res: any) => res);
  }

  toggleLike(objectId): Observable<any> {
    return this.api.post(`${this.path}/like/${objectId}`, {objectId: objectId})
      .map((res: any) => res);
  }

  vote(objectId, vote): Observable<any> {
    return this.api.post(`${this.path}/vote/${objectId}`, {vote: vote})
      .map((res: any) => res);
  }
}
