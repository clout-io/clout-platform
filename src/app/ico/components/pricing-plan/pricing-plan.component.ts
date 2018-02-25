import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.scss']
})
export class PricingPlanComponent implements OnInit {
  public header: any;
  public pricingPlans: Array<any>;
  public selected: any;
  constructor() { }

  ngOnInit() {
    this.pricingPlans = [
      {
        type: 'premium',
        price: '$25/month',
        features: [
          'Lorem, ipsum dolor sit amet consectetur adipisicing.',
          'Lorem, ipsum dolor sit amet consectetur adipisicing.',
          'Lorem, ipsum dolor sit amet consectetur adipisicing.',
          'Lorem, ipsum dolor sit amet consectetur adipisicing.',
          'Lorem, ipsum dolor sit amet consectetur adipisicing.'
        ],
        button: 'Get Started'
      },
      {
        type: 'regular',
        price: 'Free',
        features: [
          'Lorem, ipsum dolor sit amet consectetur adipisicing.',
          'Lorem, ipsum dolor sit amet consectetur adipisicing.',
          'Lorem, ipsum dolor sit amet consectetur adipisicing.'
        ],
        button: 'Get Started'
      }
    ];
    this.selected = this.pricingPlans[0].type;
    this.header = {
      title: 'Pricing Plans',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum.'
    };
  }

  selectPlan(type) {
    this.selected = type;
  }
}
