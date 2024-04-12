import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment.development';
import { v4 as uuid } from 'uuid';

import { ApiService } from '../../services/api-service/api.service';
import { Product } from '../../models/product';
import { CartActions } from '../../store/cart.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  imgBasePath = `${environment.apiUrl}/images/`;
  productId = '';
  product!: Product;
  quantity = 0;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['productId'];
    });
    this.apiService
      .getProduct(this.productId)
      .subscribe((product) => (this.product = product));
  }

  increaseQuantity() {
    if (this.quantity <= 100) {
      this.quantity = this.quantity + 1;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity = this.quantity - 1;
    }
  }

  addToCart() {
    if (this.quantity > 0) {
      let cartId = '';
      const storedCartId = localStorage.getItem('cartId');

      if (!storedCartId) {
        cartId = uuid();
        localStorage.setItem('cartId', cartId);
      } else {
        cartId = storedCartId;
      }

      this.store.dispatch(
        CartActions.addItems({
          cartId,
          productId: this.productId,
          quantity: this.quantity,
        })
      );
    }
  }
}
