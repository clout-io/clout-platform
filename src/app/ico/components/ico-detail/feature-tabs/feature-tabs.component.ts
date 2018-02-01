import {Component, OnInit, Input} from '@angular/core';
import {IcosService} from '../../../../services';

@Component({
  selector: 'app-feature-tabs',
  templateUrl: './feature-tabs.component.html',
  styleUrls: ['./feature-tabs.component.scss']
})
export class FeatureTabsComponent implements OnInit {
  @Input() icoData;
  countries = [];

  constructor(private icosService: IcosService) {}

  ngOnInit() {
    this.icosService.getCountries().take(1)
      .subscribe(countriesObj => this.countries = countriesObj);
  }

}
