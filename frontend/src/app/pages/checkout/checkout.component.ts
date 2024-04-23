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
  active = '';
  showPath = true;

  constructor() {}

  ngOnInit(): void {}

  onActivate(component: any) {
    if (component instanceof CheckoutFormComponent) {
      this.active = 'form';
      component.orderAdded.subscribe((orderId) => {
        this.orderId = orderId;
      });
    }
    if (component instanceof OrderSummaryComponent) {
      this.active = 'summary';
    }
    if (component instanceof PaymentComponent) {
      this.active = 'payment';
    }
    if (component instanceof CheckoutSuccessComponent) {
      this.showPath = false;
    }
  }
}
