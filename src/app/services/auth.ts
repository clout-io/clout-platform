import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  JWT = 'auth_token';
  authorization = 'Authorization';
  token = 'Token';

  constructor(
    private router: Router,
    private api: ApiService
  ) {
    const auth_token = window.localStorage.getItem(this.JWT);
    if (auth_token) {
      this.setToken(auth_token);
    }
  }

  isAuthorized() {
    return Boolean(window.localStorage.getItem(this.JWT));
  }

  setToken(token: string) {
    window.localStorage.setItem(this.JWT, token);
    this.api.setHeaders({[this.authorization]: `${this.token} ${token}`});
  }

  authenticate(credits): Observable<any> {
    return this.api.post(`/${this.api.signup_url}`, credits)
      .do((res: any) => {
        if (res.token) { this.setToken(res.token); }
      })
      .map((res: any) => res);
  }

  activate(code: string) {
    return this.api.get(`/${this.api.activate_url}${code}`)
      .do((res: any) => {
        if (res.token) { this.setToken(res.token); }
      })
      .map((res: any) => res);
  }

  signin(data: any): Observable<any> {
    return this.api.post(`/${this.api.signin_url}`, data)
      .do((res: any) => {
        if (res.token) { this.setToken(res.token); }
      })
      .map((res: any) => res);
  }

  getFacebookUrlAndRedirect() {
    this.api.get(`/${this.api.facebook_url}?redirectUri=${this.api.redirect_uri}`)
      .subscribe(data => {
        const authorizeUrl = data.url;
        const url = `${authorizeUrl}&redirect_uri=${this.api.redirect_uri}`;
        this.openDialog(url, 'auth window', 'width=640,height=480,resizable=1', () => {
          console.log('authorized', this.isAuthorized());
          if (this.isAuthorized()) {
            this.router.navigateByUrl('/');
          }
        });
      });
  }

  facebookAuthenticate(code: string): Observable<any> {
    return this.api.get(`/${this.api.facebook_auth_url}?code=${code}&redirectUri=${this.api.redirect_uri}`)
      .do((res: any) => {
        if (res.token) { this.setToken(res.token); }
      });
  }

  openDialog(uri, name, options, callback) {
    setTimeout(() => {
      const win = window.open(uri, name, options);
      let interval;
      interval = window.setInterval(function () {
        try {
          if (win == null || win.closed) {
            window.clearInterval(interval);
            callback();
          }
          if (win == null) {
            alert('Please disable your popup blocker');
          }
        } catch (error) {
          alert('Please disable your popup blocker');
        }
      }, 500);
      return win;
    }, 0);
  }

  signout() {
    this.api.deactivate();
    this.router.navigateByUrl('login');
  }

}
