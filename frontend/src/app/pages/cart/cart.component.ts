import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Store } from '@ngrx/store';

import { selectItemList, selectTotalSum } from '../../store/cart.selector';
import { CartActions } from '../../store/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartId = '';
  storedCartId = localStorage.getItem('cartId');
  imgBasePath = `${environment.apiUrl}/images/`;

  totalSum$ = this.store.select(selectTotalSum);
  cartItemList$ = this.store.select(selectItemList);

  constructor(private store: Store) {
    this.cartId = this.storedCartId ? this.storedCartId : '';
    this.store.dispatch(CartActions.loadCartItems({ cartId: this.cartId }));
  }

  ngOnInit(): void {
    // TODO: if empty show message on page
  }

  addOneProduct(productId: number) {
    this.store.dispatch(
      CartActions.addItem({ cartId: this.cartId, productId })
    );
  }
}
