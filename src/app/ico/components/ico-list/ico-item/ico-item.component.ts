import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-ico-item',
  templateUrl: './ico-item.component.html',
  styleUrls: ['./ico-item.component.scss']
})
export class IcoItemComponent implements OnInit {
  @Input() ico;
  @Input() slug;
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  selectItem() {
    this.notify.emit(this.ico.slug);
  }
}
