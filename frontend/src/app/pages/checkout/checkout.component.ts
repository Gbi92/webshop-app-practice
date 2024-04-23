import { Component, OnInit } from '@angular/core';

import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  orderId = '';
  disableSummary = true;
  disablePayment = true;
  showNavigation = true;

  constructor() {}

  ngOnInit(): void {}

  onActivate(component: any) {
    // TODO: make this better
    if (component instanceof CheckoutFormComponent) {
      this.disableSummary = true;
      this.disablePayment = true;
      component.orderAdded.subscribe((orderId) => {
        this.orderId = orderId;
      });
    }
    if (component instanceof OrderSummaryComponent) {
      this.disableSummary = false;
    }
    if (component instanceof PaymentComponent) {
      this.disablePayment = false;
    }
    if (component instanceof CheckoutSuccessComponent) {
      this.showNavigation = false;
    }
  }
}
