import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-altcoin-item',
  templateUrl: './altcoin-item.component.html',
  styleUrls: ['./altcoin-item.component.scss']
})
export class AltcoinItemComponent implements OnInit {
  @Input() altcoin;

  constructor() { }

  ngOnInit() {
    //console.log('t', this.altcoin);
  }

}
