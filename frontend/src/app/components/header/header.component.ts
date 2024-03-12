import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingService } from '../../services/shopping-service/shopping.service';
import { ApiService } from '../../services/api-service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartId = '';
  storedCartId = localStorage.getItem('cartId');
  cartCounter = 0;
  private addedOneSub!: Subscription;

  constructor(
    private shoppingService: ShoppingService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.cartId = this.storedCartId ? this.storedCartId : '';
    this.apiService
      .getCartItems(this.cartId)
      .subscribe((cartResponse) => (this.cartCounter = cartResponse.length));

    this.addedOneSub = this.shoppingService.addedProductEmitter.subscribe(
      (cartLength) => (this.cartCounter = cartLength)
    );
    // TODO: update counter
  }

  ngOnDestroy(): void {
    this.addedOneSub.unsubscribe();
  }
}
