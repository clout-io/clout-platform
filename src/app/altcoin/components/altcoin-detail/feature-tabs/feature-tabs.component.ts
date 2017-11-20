import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-feature-tabs',
  templateUrl: './feature-tabs.component.html',
  styleUrls: ['./feature-tabs.component.scss']
})
export class FeatureTabsComponent implements OnInit {
  currentTabNumber: number = 1;

  constructor() { }

  ngOnInit() {
  }

  selectTab(tabNumber) {
    this.currentTabNumber = tabNumber;
  }
}
