import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Store } from '@ngrx/store';

import { selectItemList, selectTotalSum } from '../../store/cart.selector';
import { CartActions } from '../../store/cart.actions';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartId = '';
  storedCartId = localStorage.getItem('cartId');
  imgBasePath = `${environment.apiUrl}/images/`;

  totalSum$ = this.store.select(selectTotalSum);
  cartItemList$ = this.store.select(selectItemList);

  constructor(private store: Store) {
    this.cartId = this.storedCartId ? this.storedCartId : '';
    this.store.dispatch(CartActions.loadCartItems({ cartId: this.cartId }));
  }

  addOneProduct(productId: number) {
    this.store.dispatch(
      CartActions.addItem({ cartId: this.cartId, productId })
    );
  }

  deleteOneProduct(product: Product) {
    this.store.dispatch(
      CartActions.deleteLastItem({ cartId: this.cartId, product })
    );
  }

  deleteAllProducts(product: Product) {
    this.store.dispatch(
      CartActions.deleteAllItems({ cartId: this.cartId, product })
    );
  }

  emptyCart() {
    this.store.dispatch(CartActions.emptyCart({ cartId: this.cartId }));
  }
}
