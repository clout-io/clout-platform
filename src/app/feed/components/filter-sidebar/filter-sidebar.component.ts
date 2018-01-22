import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { Ng2FlatpickrComponent } from 'ng2-flatpickr/ng2-flatpickr';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';
import  rangePlugin from 'flatpickr/dist/plugins/rangePlugin';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent implements OnInit {

  initialPosition = [0, 5000]

  defaultOptions: FlatpickrOptions = {
    dateFormat: "m/d/Y",
    mode: "range",
    plugins: [rangePlugin({ input: "#secondRangeInput" })]
  };

  constructor() {
    
  }

  sliderChange(i){
    console.log(i);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

}
