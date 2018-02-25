import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { PaymentService} from '../../../../services/paymentService';
import { Headers, Http, Response } from '@angular/http';
@Component({
  selector: 'app-pricing-box',
  templateUrl: './pricing-box.component.html',
  styleUrls: ['./pricing-box.component.scss']
})
export class PricingBoxComponent implements OnInit {
  @Input() plan;
  @Input() selected;

  constructor(
      private paymentService: PaymentService, 
      private http: Http
  ) { }

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
  /**
   * @returns void
   */
  paymentModal(): void {
    const servicePay = this.paymentService;
    const url = '/api/vi/payment/charge';
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripePublicKey,
      locale: 'auto',
      token: function (token: any) {

        const sendData = {
          stripeToken: token.id,
          email: token.email
        }

        servicePay.payment(sendData).take(1)
        .subscribe(response => {
          //action for saving
        });
      }
    });

    handler.open({
      name: 'Clout Site',
      description: 'Clout Decentralized Media Platform',
      amount: 2500 //TODO make it dynamic
    });
  }
}
