import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Response} from '@angular/http';

@Injectable()
export class ApiHelperService {
  constructor(
    private router: Router
  ) {}

  getOptions(options?): string {
    let params = ``,
      paramAnd;
    for (let key in options) {
      paramAnd = (key != Object.keys(options)[0]) ? '&' : `?`;
      params+=`${paramAnd}${key}=${options[key]}`;
    }
    return params;
  }

  getJson(response: Response) {
    return response;
  }

  removeTokenFromLocalStorage(tokenName: string) {
    window.localStorage.removeItem(tokenName);
  }

  removeEmailFromLocalStorage(key: string) {
    window.localStorage.removeItem(key);
  }
}
