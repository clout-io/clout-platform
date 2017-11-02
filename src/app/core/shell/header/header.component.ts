import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUrl: string;
  userEmail: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    const email = window.localStorage.getItem('clout_user');
    console.log('email', email);
    if (email) {
      this.userEmail = email;
    }
  }

  ngOnInit() {
    this.currentUrl = this.router.url === '/allcoins' ? 'Allcoins' : 'ICOs';
  }

  logout(event) {
    event.preventDefault();
    this.auth.signout();
  }

}
