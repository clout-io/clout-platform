import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services';

@Component({
  selector: 'app-altcoin-list',
  templateUrl: './altcoin-list.component.html',
  styleUrls: ['./altcoin-list.component.scss']
})
export class AltcoinListComponent implements OnInit {
  public url = '../../../assets/coin-img.png';
  public altcoinList;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get(`/${this.apiService.altcoins}`)
      .map(data => {
        return data.filter((item, i) => {
          return i < 9;
        });
      })
      .subscribe(altcoins => {
        this.altcoinList = altcoins;
      });
  }

}
