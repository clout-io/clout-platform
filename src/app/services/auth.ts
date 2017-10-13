import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private router: Router
  ) {}

  setUser() {
    window.localStorage.setItem('cloutUser', 'user');
  }

  isAuthorized(): boolean {
    return Boolean(window.localStorage.getItem('cloutUser'));
  }

  onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      this.router.navigate(['', 'login']);
    }
  }

  signin() {
    this.setUser();
    this.router.navigate(['', '/']);
  }

  signout() {
    window.localStorage.removeItem('cloutUser');
    this.onCanActivate(this.isAuthorized());
  }

}
