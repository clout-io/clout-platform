import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api';
import 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate {
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

  canActivate(): boolean {
    if (this.isAuthorized()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

  isAuthorized() {
    return Boolean(window.localStorage.getItem(this.JWT));
  }

  setToken(token: string) {
    window.localStorage.setItem(this.JWT, token);
    this.api.setHeaders({[this.authorization]: `${this.token} ${token}`});
  }

  setUser(user: any) {
    const {id, avatar, username} = user;
    window.localStorage.setItem('clout_user_id', id);
    window.localStorage.setItem('clout_user_avatar', avatar);
    window.localStorage.setItem('clout_user_username', username);
  }

  authenticate(credits): Observable<any> {
    return this.api.post(`/${this.api.signup_url}`, credits)
      .do((res: any) => {
        if (res.token) {
          this.setToken(res.token);
          this.setUser(res.user);
        }
      })
      .map((res: any) => res);
  }

  activate(code: string) {
    return this.api.get(`/${this.api.activate_url}${code}`)
      .do((res: any) => {
        if (res.token) {
          this.setToken(res.token);
          this.setUser(res.user);
        }
      })
      .map((res: any) => res);
  }

  signin(data: any): Observable<any> {
    return this.api.post(`/${this.api.signin_url}`, data)
      .do((res: any) => {
        if (res.token) {
          this.setToken(res.token);
          this.setUser(res.user);
        }
      })
      .map((res: any) => res);
  }

  getFacebookUrlAndRedirect() {
    this.api.get(`/${this.api.facebook_url}?redirectUri=${this.api.redirect_uri}`)
      .subscribe(data => {
        const authorizeUrl = data.url;
        const url = `${authorizeUrl}&redirect_uri=${this.api.redirect_uri}`;
        window.location.href = url;
      });
  }

  facebookAuthenticate(code: string): Observable<any> {
    return this.api.get(`/${this.api.facebook_auth_url}?code=${code}&redirectUri=${this.api.redirect_uri}`)
      .do((res: any) => {
        if (res.token) {
          this.setToken(res.token);
          this.setUser(res.user);
        }
      });
  }

  resetUserPassword(email: string): Observable<any>  {
    return this.api.get(`/${this.api.reset_user_password}?email=${email}`);
  }

  resetUserPasswordCode(code, credits): Observable<any> {
    return this.api.post(`/${this.api.reset_user_password}/${code}`, credits)
      .do((res: any) => {
        if (res.token) {
          this.setToken(res.token);
          this.setUser(res.user);
        }
      });
  }

  signout() {
    this.api.deactivate();
    this.router.navigateByUrl('login');
  }

}
