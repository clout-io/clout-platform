import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-ico-item',
  templateUrl: './ico-item.component.html',
  styleUrls: ['./ico-item.component.scss']
})
export class IcoItemComponent implements OnInit, OnChanges {
  @Input() ico;
  @Input() selectedId;
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes): void {
    if (!this.ico) { return; }

    if (!this.ico.image) {
      this.ico.imageUrl = '';
    } else if (typeof this.ico.image === 'string') {
      this.ico.imageUrl = this.ico.image;
    } else if (typeof this.ico.image === 'object') {
      this.ico.imageUrl = environment.url + this.ico.image.url;
    }
  }

  selectItem() {
    this.notify.emit(this.ico.id);
  }

}
