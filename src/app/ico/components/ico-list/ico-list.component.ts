import { Component, OnInit } from '@angular/core';

import { ApiService, BroadcastService } from '../../../services';

@Component({
  selector: 'app-ico-list',
  templateUrl: './ico-list.component.html',
  styleUrls: ['./ico-list.component.scss']
})
export class IcoListComponent implements OnInit {
  public icoList: Array<any>;
  public selectedId: string;
  private meta = {
    nextPage: 1,
    perPage: 20
  };

  constructor(private apiService: ApiService,
              private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.apiService.get(`/${this.apiService.icos}?page=${this.meta.nextPage}&per_page=${this.meta.perPage}`)
      .subscribe(responce => {
        this.icoList = responce.data;
        this.selectedItem(this.icoList[0].id);
        this.meta = responce.meta;
      });
  }

  selectedItem(id: string): void {
    this.selectedId = id;

    this.apiService.get(`/${this.apiService.ico}/${id}`)
      .subscribe(ico => {
        this.broadcastService.broadcast('icoInfo', ico);
      });
  }

}
