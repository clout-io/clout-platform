import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit, OnChanges {
  @Input() icoData;
  investScore: any;
  riskScore: any;
  hypeScore: any;
  projectStage: any;
  categories: any;
  scores: Array<any> = [
    {value: 'low', label: 'LOW'},
    {value: 'medium', label: 'MEDIUM'},
    {value: 'hight', label: 'HIGH'},
  ];

  constructor() { }

  ngOnChanges(changes): void {
    if (!this.icoData) { return; }
    this.scores.map(item => {
      console.log('this.icoData.investScore', this.icoData.investScore);
      console.log('this.icoData.riskScore', this.icoData.riskScore);
      console.log('this.icoData.hypeScore', this.icoData.hypeScore);
      if (item.value === this.icoData.investScore) {
        this.investScore = item.label;
      }
      if (item.value === this.icoData.riskScore) {
        this.riskScore = item.label;
      }
      if (item.value === this.icoData.hypeScore) {
        this.hypeScore = item.label;
      }
    });
    this.projectStage = this.icoData.projectStage ? this.icoData.projectStage.name : '';
    const categories = this.icoData.categories.map(item => {
      return item.name;
    });
    this.categories = categories.join(',');
  }

  ngOnInit() {

  }

}
