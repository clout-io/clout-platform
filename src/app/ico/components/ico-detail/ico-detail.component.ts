import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-ico-detail',
  templateUrl: './ico-detail.component.html',
  styleUrls: ['./ico-detail.component.scss']
})
export class IcoDetailComponent implements OnInit {
  @Input() ico: any;

  constructor() { }

  ngOnInit() {}
}
