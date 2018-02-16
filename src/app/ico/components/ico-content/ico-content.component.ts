import { Component, OnInit,  OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcosService, BroadcastService } from '../../../services';

@Component({
  selector: 'app-ico-content',
  templateUrl: './ico-content.component.html',
  styleUrls: ['./ico-content.component.scss']
})
export class IcoContentComponent implements OnInit, OnDestroy {
  ico: any;

  private subRoute: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private icosService: IcosService,
              private broadcastService: BroadcastService) {

    this.subRoute = this.route.params.subscribe(params => {
      if (params['slug']) {
        this.updateSelectedIco(params['slug']);
        this.loadCoin(params['slug']);
      } else {
        this.updateSelectedIco(false);
        this.router.navigate(['/icos/ongoing', '']);
      }
    });
  }

  ngOnInit() {}

  loadCoin(slug) {
    if (!slug) { this.updateSelectedIco(false); return; }

    this.icosService.getIco(slug)
      .subscribe(ico => {
        this.ico = ico;
        this.updateSelectedIco(slug);
      }, error => this.router.navigate(['ongoing']));
  }

  updateSelectedIco(slug) {
    this.broadcastService.broadcast('updateSelectedIco', slug);
  }

  ngOnDestroy(): void {
    this.subRoute.unsubscribe();
  }
}
