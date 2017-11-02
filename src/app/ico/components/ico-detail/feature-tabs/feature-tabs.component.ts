import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feature-tabs',
  templateUrl: './feature-tabs.component.html',
  styleUrls: ['./feature-tabs.component.scss']
})
export class FeatureTabsComponent implements OnInit {
  @Input() icoData;

  constructor() { }

  ngOnInit() {
  }

}
