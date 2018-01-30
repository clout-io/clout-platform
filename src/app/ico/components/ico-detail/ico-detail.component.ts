import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-ico-detail',
  templateUrl: './ico-detail.component.html',
  styleUrls: ['./ico-detail.component.scss']
})
export class IcoDetailComponent implements OnInit, OnDestroy {
  @Input() ico: any;
  url = environment.url;

  constructor() { }

  ngOnInit() {}

  ngOnDestroy(): void {}
}
