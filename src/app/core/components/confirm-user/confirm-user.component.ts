import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-confirm-user',
  template: '<div></div>',
  styleUrls: ['./confirm-user.component.scss']
})
export class ConfirmUserComponent implements OnInit, OnDestroy {
  private subscribeRoute: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscribeRoute = this.route.queryParams.subscribe((params: Params) => {
      const { code } = params;
      this.authService.activate(code)
        .subscribe(
        response => { this.router.navigateByUrl('/'); },
        error => { this.router.navigateByUrl('login'); }
        );
    });
  }

  ngOnDestroy(): void {
    this.subscribeRoute.unsubscribe();
  }

}
