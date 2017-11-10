import { Component, OnInit, Input } from '@angular/core';
import { PercentPipe } from './../../../../../pipes/percentPipe';

@Component({
  selector: 'app-fav-coin-item',
  templateUrl: './fav-coin-item.component.html',
  styleUrls: ['./fav-coin-item.component.scss']
})
export class FavCoinItemComponent implements OnInit {
  @Input() favCoin;

  constructor() { }

  ngOnInit() {
  }

}
