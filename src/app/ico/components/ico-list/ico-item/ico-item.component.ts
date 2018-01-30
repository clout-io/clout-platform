import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-ico-item',
  templateUrl: './ico-item.component.html',
  styleUrls: ['./ico-item.component.scss']
})
export class IcoItemComponent implements OnInit {
  url = environment.url;
  @Input() ico;
  @Input() selectedId;
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit() {
    /*this.url = environment.url + '/' + this.ico.image.url;
    console.log(this.ico)
    console.log(this.ico.image)
    console.log(this.ico.image.url)*/
  }

  selectItem() {
    this.notify.emit(this.ico.id);
  }

}
