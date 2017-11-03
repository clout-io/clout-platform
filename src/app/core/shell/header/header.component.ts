import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUrl: string;
  userEmail: string;
  subscribe: any;

  constructor(private auth: AuthService, private router: Router) {
    const email = window.localStorage.getItem('clout_user');
    this.userEmail = email ? email : null;
  }

  ngOnInit() {
    this.setTitle();

    this.subscribe = this.router.events.subscribe(event => {//Update nav title
      if (event instanceof NavigationEnd) {
        this.setTitle();
      }
    });
  }

  setTitle() {
    let title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
    this.currentUrl = title;
  }

  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  logout(event) {
    event.preventDefault();
    this.auth.signout();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
