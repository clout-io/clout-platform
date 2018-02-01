import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tech-tab',
  templateUrl: './tech-tab.component.html',
  styleUrls: ['./tech-tab.component.scss']
})
export class TechTabComponent implements OnInit {
  @Input() icoData;

  constructor() { }

  ngOnInit() {
  }

}
