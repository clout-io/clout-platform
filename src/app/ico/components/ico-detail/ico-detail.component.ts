import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, BroadcastService } from '../../../services';
import { environment } from '../../../../environments/environment';
declare const $;


@Component({
  selector: 'app-ico-detail',
  templateUrl: './ico-detail.component.html',
  styleUrls: ['./ico-detail.component.scss']
})
export class IcoDetailComponent implements OnInit, OnDestroy {
  ico: any;
  icoId: number;

  private subscription: any;
  private subRoute: any;
  @Input() fromUrl: boolean = false;

  constructor(private apiService: ApiService,
              private broadcastService: BroadcastService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe('icoInfo', (icoData) => {
      this.ico = icoData;
      this.ico['description'] =  $(this.ico['description']).text();
    });

    if (this.fromUrl) {
      this.subRoute = this.route.params.subscribe(params => {
        this.icoId = params['id']; // (+) converts string 'id' to a number
        this.loadCoin(this.icoId);
      });
    }
  }

  loadCoin(id) {
    if (!id)
      return false;

    this.apiService.get(`/${this.apiService.ico}/${id}`)
      .subscribe(ico => {
        ico.imageUrl = environment.url + ico.image;
        this.ico = ico;
        this.ico['description'] =  $(this.ico['description']).text();
      }, eror => this.router.navigate(['all']));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.fromUrl && this.subRoute.unsubscribe();
  }
}
