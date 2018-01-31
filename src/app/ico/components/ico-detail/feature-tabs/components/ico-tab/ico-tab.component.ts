import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-ico-tab',
  templateUrl: './ico-tab.component.html',
  styleUrls: ['./ico-tab.component.scss']
})
export class IcoTabComponent implements OnInit, OnChanges {
  @Input() icoData;
  @Input() countries;
  jurisdiction: string;

  constructor() { }

  ngOnChanges(): void {
    if (!this.icoData) { return; }

    this.jurisdiction = this.countries[this.icoData.jurisdiction];
  }

  ngOnInit() {
  }

}
