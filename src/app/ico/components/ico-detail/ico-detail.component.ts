import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-ico-detail',
  templateUrl: './ico-detail.component.html',
  styleUrls: ['./ico-detail.component.scss']
})
export class IcoDetailComponent implements OnInit, OnChanges {
  @Input() ico: any;
  hideOverflow: boolean;
  description: string;
  descriptionLength: number;
  MAX_TEXT_LENGTH_SHOW = 256;

  constructor() { }

  ngOnChanges(): void {
    if (!this.ico) { return; }

    const div = document.createElement('div');
    div.innerHTML = this.ico.description;
    const descriptionText = div.textContent || div.innerText;
    this.descriptionLength = descriptionText.length;
    this.hideOverflow = descriptionText.length > this.MAX_TEXT_LENGTH_SHOW;
    this.setDescription();
  }

  ngOnInit() {}

  moreOrLess(): void {
    this.hideOverflow = !this.hideOverflow;
    this.setDescription();
  }

  setDescription(): void {
    this.description = this.hideOverflow ?
      this.ico.description.slice(0, this.MAX_TEXT_LENGTH_SHOW) + '...' : this.ico.description;
  }
}
