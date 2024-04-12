import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCartLength } from '../../store/cart.selector';
import { CartActions } from '../../store/cart.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  cartCounter = this.store.select(selectCartLength);
  cartId = '';
  storedCartId = localStorage.getItem('cartId');
  isLoggedIn = localStorage.getItem('token') ? true : false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.cartId = this.storedCartId ? this.storedCartId : '';
    this.store.dispatch(CartActions.loadCartItems({ cartId: this.cartId }));
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }
}
