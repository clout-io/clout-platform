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
  scores = {
    'low': 'LOW',
    'medium': 'MEDIUM',
    'hight': 'HIGH'
  };

  constructor() { }

  ngOnChanges(changes): void {
    if (!this.icoData) { return; }

    this.investScore = this.scores[this.icoData.investScore] || '';
    this.riskScore = this.scores[this.icoData.riskScore] || '';
    this.hypeScore = this.scores[this.icoData.hypeScore] || '';
    this.projectStage = this.icoData.projectStage ? this.icoData.projectStage.name : '';
    this.categories = this.icoData.categories.map(item => item.name).join(', ');
  }

  ngOnInit() {}
}
