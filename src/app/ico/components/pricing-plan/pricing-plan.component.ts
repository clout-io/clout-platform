import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.scss']
})
export class PricingPlanComponent implements OnInit {
  premiumPlan = 'selected';
  regularPlan = '';
  constructor() { }

  ngOnInit() {
  }
  selectPlan(planType: string) {
    if (planType === 'premium') {
      this.premiumPlan = 'selected';
      this.regularPlan = '';
    } else {
      this.premiumPlan = '';
      this.regularPlan = 'selected';
    }
  }
}
