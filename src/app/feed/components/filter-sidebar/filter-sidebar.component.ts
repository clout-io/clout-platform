import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent implements OnInit {

  initialPosition = [0, 5000]

  constructor() { }

  sliderChange(i){
    console.log(i);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

}
