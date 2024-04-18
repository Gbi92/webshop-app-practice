import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment.development';
import { v4 as uuid } from 'uuid';

import { Product } from '../../models/product';
import { CartActions } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  imgBasePath = `${environment.apiUrl}/images/`;

  constructor(private store: Store) {}

  onAddToCart(product: Product) {
    let cartId = '';
    const storedCartId = localStorage.getItem('cartId');

    if (!storedCartId) {
      cartId = uuid();
      localStorage.setItem('cartId', cartId);
    } else {
      cartId = storedCartId;
    }

    this.store.dispatch(
      CartActions.addItem({ cartId: cartId, productId: product.id })
    );
  }
}
