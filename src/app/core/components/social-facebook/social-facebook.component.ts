import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-social-facebook',
  templateUrl: 'social-facebook.component.html',
  styleUrls: ['./social-facebook.component.scss']
})
export class SocialFacebookComponent implements OnInit, OnDestroy {
  private subscribeRoute: any;
  public isError: boolean;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscribeRoute = this.route.queryParams.subscribe((params: Params) => {
      const { code } = params;
      this.authService.facebookAuthenticate(code)
        .subscribe(
          data => this.router.navigateByUrl('/'),
          error => {
            this.isError = true;
          });
    });
  }

  ngOnDestroy(): void {
    this.subscribeRoute.unsubscribe();
  }

}
