import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import { AuthService, FeedService } from '../../../services';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('hiddenCoinsDropdown') hiddenCoinsDropdown;
  currentUrl: string;
  userName: string;
  avatar: string;
  subscribe: any;
  topList: any;
  hashtagUrl = '/home/community/hashtag/';
  top$: any;
  mobileSearchVisible: boolean = false;
  visibleAlphabeticalDropdown: boolean;

  isAuthUser: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private feedService: FeedService
  ) {
    const name = window.localStorage.getItem('clout_user_username');
    this.avatar = window.localStorage.getItem('clout_user_avatar');
    this.userName = name ? name : null;
  }

  ngOnInit() {
    this.setTitle();

    this.subscribe = this.router.events.subscribe(event => {//Update nav title
      if (event instanceof NavigationEnd) {
        this.setTitle();
      }
    });

    const coinsName = this.router.url === '/icos' ? 'icos' : 'altcoins';
    this.top$ = this.feedService.getTopCoins(coinsName, 30)
      .subscribe(responce => {
        this.topList = responce.data;
      });

    this.isAuthUser = this.isAuthorized();
  }

  isAuthorized() {
    return Boolean(window.localStorage.getItem(this.auth.JWT));
  }

  ngAfterViewInit() {

    let lastScrollTop = 0;
    let me = this;

    window.onscroll = function () {
      let scrolled = window.pageYOffset;
      if (scrolled > lastScrollTop) {
        // downscroll code
        if (scrolled > 100) {
          document.body.classList.remove('sticky-header__bottom');
        }

        document.getElementsByClassName('header')[0].classList.remove('mobile-nav-open');
        me.mobileSearchVisible = false;
      } else {
        // upscroll code
        if (scrolled > 100) {
          document.body.classList.add('sticky-header__bottom');
        }

        if (scrolled == 0) {
          document.body.classList.remove('sticky-header__top', 'sticky-header__bottom');
        }
      }

      if (scrolled > 100) {
        document.body.classList.add('sticky-header__top');
      }

      lastScrollTop = scrolled;

    };

  }

  showCoinsDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.hiddenCoinsDropdown.nativeElement.click();
  }

  showAlphabetCoinDropdown() {
    this.visibleAlphabeticalDropdown = !this.visibleAlphabeticalDropdown;
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

  toggleSearchOnMobile(event) {
    event.preventDefault();
    this.mobileSearchVisible = !this.mobileSearchVisible;
  }
}
