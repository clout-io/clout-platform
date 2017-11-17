import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, ApiService } from '../../../services';
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
  topList: any;
  hashtagUrl = '/home/community/hashtag/';
  top$: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {
    const email = window.localStorage.getItem('clout_user_email');
    this.userEmail = email ? email : null;
  }

  ngOnInit() {
    this.setTitle();

    this.subscribe = this.router.events.subscribe(event => {//Update nav title
      if (event instanceof NavigationEnd) {
        this.setTitle();
      }
    });

    this.top$ = this.apiService.get('/api/v1/altcoins/top?top=20')
      .subscribe(responce => this.topList = responce.data);
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
    this.top$.unsubscribe();
  }
}
