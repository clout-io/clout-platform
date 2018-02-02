import { Component, OnInit,  OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcosService } from '../../../services';

@Component({
  selector: 'app-ico-content',
  templateUrl: './ico-content.component.html',
  styleUrls: ['./ico-content.component.scss']
})
export class IcoContentComponent implements OnInit, OnDestroy {
  ico: any;
  icoId: string;

  private subRoute: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private icosService: IcosService) {
    this.subRoute = this.route.params.subscribe(params => {
      if (params['id']) {
        this.icoId = params['id']; // (+) converts string 'id' to a number
        this.loadCoin(this.icoId);
      }
    });
  }

  ngOnInit() {}

  loadCoin(id) {
    if (!id) { return; }

    this.icosService.getIco(id)
      .subscribe(ico => this.ico = ico,
          error => this.router.navigate(['all']));
  }

  ngOnDestroy(): void {
    this.subRoute.unsubscribe();
  }
}
