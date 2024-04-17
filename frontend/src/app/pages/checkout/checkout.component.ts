import { Component, OnInit } from '@angular/core';

import { CheckoutFormComponent } from './checkout-form/checkout-form/checkout-form.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  orderId = '';

  constructor() {}

  ngOnInit(): void {}

  onCheckoutFormActivation(component: any) {
    if (component instanceof CheckoutFormComponent) {
      component.orderAdded.subscribe((orderId) => {
        this.orderId = orderId;
      });
    }
  }
}
