import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/products';
import { ApiService } from '../../services/api-service/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartId = '';
  productList: Product[] = [];
  storedCartId = localStorage.getItem('cartId');

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cartId = this.storedCartId ? this.storedCartId : '';
    this.apiService
      .getCartItems(this.cartId)
      .subscribe((response) => (this.productList = response));
    // TODO: if empty show message on page
  }
}
