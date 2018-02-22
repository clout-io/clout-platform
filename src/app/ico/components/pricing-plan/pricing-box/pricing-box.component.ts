import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import { environment } from '../../../../../environments/environment';

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
  /* params planType: string
  * check if the planType is premium or regular
  */
  getStarted(planType: string) {
    if (planType === 'premium') {
      this.paymentModal();
    } else {
      //TODO what will be action for regular
      console.log('regular');
    }
  }

  /*return display stripe payment modal for clout*/
  paymentModal(): void {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripePublicKey,
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use
        // add permission
      }
    });

    handler.open({
      name: 'Clout Site',
      description: 'Clout Decentralized Media Platform',
      amount: 2500 //TODO make it dynamic
    });
  }
}
