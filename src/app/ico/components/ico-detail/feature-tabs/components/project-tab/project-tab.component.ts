import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-tab',
  templateUrl: './project-tab.component.html',
  styleUrls: ['./project-tab.component.scss'],
})
export class ProjectTabComponent implements OnInit, OnChanges {
  @Input() icoData;
  @Input() countries;
  industry: string;
  primaryGeography: string;

  constructor() { }

  ngOnChanges(changes): void {
    if (!this.icoData) { return; }

    this.industry = !!this.icoData.industry && !!this.icoData.industry[0] ?
      this.icoData.industry[0].name : '';
    this.primaryGeography = this.countries[this.icoData.primaryGeography];
  }

  ngOnInit() {}
}
