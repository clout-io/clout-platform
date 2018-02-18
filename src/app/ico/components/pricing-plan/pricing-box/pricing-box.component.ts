import {Component, OnInit, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pricing-box',
  templateUrl: './pricing-box.component.html',
  styleUrls: ['./pricing-box.component.scss']
})
export class PricingBoxComponent implements OnInit {
  @Input() plan;
  @Input() selected;

  constructor() { }

  ngOnInit() {}
}
