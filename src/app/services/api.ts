import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { ApiHelperService } from './apiHelper';
import { BroadcastService } from './broadcastService';

@Injectable()
export class ApiService {
  api_url = 'http://haumea.bvblogic.net:8103';
  signin_url = 'api/v1/signin';
  signup_url = 'api/v1/signup';
  activate_url = 'api/v1/activate?code=';
  facebook_url = 'api/v1/facebook/url';
  facebook_auth_url = 'api/v1/auth/facebook';
  altcoins = 'api/v1/altcoins';
  altcoin = 'api/v1/altcoin';
  icos = 'api/v1/icos';
  ico = 'api/v1/ico';
  like_url = 'api/v1/like';
  reset_user_password = 'api/v1/user/password/reset';
  redirect_uri = window.location.hostname === 'localhost' ?
    'http://localhost:4200/social/facebook' : `${this.api_url}/social/facebook`;
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  headersWithoutContentType: Headers = new Headers({
    Accept: 'application/json'
  });
  SERVER_ERROR  = 'Server error';

  constructor(
    private http: Http,
    private router: Router,
    private apiHelper: ApiHelperService,
    private broadcastService: BroadcastService
  ) {}

  private checkForError(response: Response): Response {
    if (response.status >= 200 && response.status <= 300) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error['response'] = response;
      throw error;
    }
  }

  post(path: string, body): Observable<any> {
    this.showLoader(true);
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.headers}
      )
      .map(this.checkForError)
      .catch(this.showError)
      .map(this.getJson)
      .finally(() => this.showLoader(false));
  }

  image(path: string, formData: FormData ): Observable<any> {
    this.showLoader(true);
    const headers = this.headers;
    headers.delete('Content-Type');
    return this.http.post(`${this.api_url}${path}`, formData, {headers: headers})
      .map(this.checkForError)
      .catch(this.showError)
      .map(this.getJson)
      .finally(() => this.showLoader(false));
  }

  get(path: string): Observable<any> {
    this.showLoader(true);
    return this.http.get(`${this.api_url}${path}`, {headers: this.headers})
      .map(this.checkForError)
      .catch(this.showError)
      .map(this.getJson)
      .finally(() => this.showLoader(false));
  }

  delete(path: string, options: any): Observable<any> {
    this.showLoader(true);
    return this.http.delete(`${this.api_url}${path}`, {headers: this.headers, body: options})
      .map(this.checkForError)
      .catch(this.showError)
      .map(this.getJson)
      .finally(() => this.showLoader(false));
  }

  showError = (err) => {
    console.log(err);

    if (err.status == 0 || err.status >= 500) {
      this.broadcastService.broadcast('error', this.SERVER_ERROR);
    }
    if (err.status == 401) {
      this.deactivate();
      this.broadcastService.broadcast('showPopup', 'popupCheckAccess');
    }

    let errors: any = this.apiHelper.getJson(err);
    let errorValue: string = '';
    for (let key in errors) {
      errorValue += (errors[key] instanceof Array) ?  errors[key][0] : errors[key];
      errorValue += '\n';
    }
    if (err.status !== 0 && errorValue.length !== 0 ) {
      this.broadcastService.broadcast('error', errorValue);
    }

    return Observable.throw(err.json());
  }

  getJson = (response: Response) => {
    return response.json();
  }

  setHeaders(headers) {
    Object.keys(headers)
      .forEach(header => this.headers.set(header, headers[header]));
    Object.keys(headers)
      .forEach(header => this.headersWithoutContentType.set(header, headers[header]));
  }

  removeHeader(headerName: string) {
    this.headers.delete(headerName);
  }

  private showLoader(show: boolean) {
    this.broadcastService.broadcast('showLoaderLine', show);
  }

  deactivate() {
    this.removeHeader('Authorization');
    this.apiHelper.removeItemFromLocalStorage('auth_token');
    this.apiHelper.removeItemFromLocalStorage('clout_user_email');
    this.apiHelper.removeItemFromLocalStorage('clout_user_avatar');
    this.apiHelper.removeItemFromLocalStorage('clout_user_username');
    this.apiHelper.removeItemFromLocalStorage('clout_user_id');
  }
}
