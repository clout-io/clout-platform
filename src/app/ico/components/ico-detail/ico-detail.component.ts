import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-ico-detail',
  templateUrl: './ico-detail.component.html',
  styleUrls: ['./ico-detail.component.scss']
})
export class IcoDetailComponent implements OnInit, OnChanges {
  @Input() ico: any;

  constructor() { }

  ngOnChanges(): void {
    if (!this.ico) { return; }

    if (!this.ico.image) {
      this.ico.imageUrl = '';
    } else if (typeof this.ico.image === 'string') {
      this.ico.imageUrl = this.ico.image;
    } else if (typeof this.ico.image === 'object') {
      this.ico.imageUrl = environment.url + this.ico.image.url;
    }
  }

  ngOnInit() {}
}
