import { Component, OnInit,  OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services';
import { environment } from '../../../../environments/environment';
declare const $;


@Component({
  selector: 'app-ico-content',
  templateUrl: './ico-content.component.html',
  styleUrls: ['./ico-content.component.scss']
})
export class IcoContentComponent implements OnInit, OnDestroy {
  ico: any;
  icoId: string;

  private subRoute: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.subRoute = this.route.params.subscribe(params => {
      if (params['id']) {
        this.icoId = params['id']; // (+) converts string 'id' to a number
        this.loadCoin(this.icoId);
      }
    });
  }

  ngOnInit() {}

  loadCoin(id) {
    if (!id)
      return false;

    this.apiService.get(`/${this.apiService.ico}/${id}`)
      .subscribe(ico => {
        if (!ico.image) {
          ico.imageUrl = '';
        } else if (typeof ico.image === 'string') {
          ico.imageUrl = ico.image;
        } else if (typeof ico.image === 'object') {
          ico.imageUrl = environment.url + ico.image.url;
        }

        this.ico = ico;
        //this.ico['description'] =  $(this.ico['description']).text();
      }, eror => this.router.navigate(['all']));
  }

  ngOnDestroy(): void {
    this.subRoute.unsubscribe();
  }
}
