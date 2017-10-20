import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-altcoin-list',
  templateUrl: './altcoin-list.component.html',
  styleUrls: ['./altcoin-list.component.scss']
})
export class AltcoinListComponent implements OnInit {
  public url = '../../../assets/coin-img.png';

  constructor() { }

  ngOnInit() {
  }

}
