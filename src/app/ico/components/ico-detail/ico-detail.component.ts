import { Component, OnInit, OnDestroy, Input } from '@angular/core';


@Component({
  selector: 'app-ico-detail',
  templateUrl: './ico-detail.component.html',
  styleUrls: ['./ico-detail.component.scss']
})
export class IcoDetailComponent implements OnInit, OnDestroy {
  @Input() ico: any;

  constructor() { }

  ngOnInit() {}

  ngOnDestroy(): void {}
}
