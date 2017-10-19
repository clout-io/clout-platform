import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-social-facebook',
  template: '<div></div>',
  styleUrls: ['./social-facebook.component.scss']
})
export class SocialFacebookComponent implements OnInit, OnDestroy {
  private subscribeRoute: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscribeRoute = this.route.queryParams.subscribe((params: Params) => {
      const { code } = params;
      this.authService.facebookAuthenticate(code)
        .subscribe(data => window.close());
    });
  }

  ngOnDestroy(): void {
    this.subscribeRoute.unsubscribe();
  }

}
