import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  @Input() icoData;

  constructor() { }

  ngOnInit() {
  }

}
