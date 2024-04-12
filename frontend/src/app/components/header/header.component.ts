import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCartLength } from '../../store/cart.selector';
import { CartActions } from '../../store/cart.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  cartCounter = this.store.select(selectCartLength);
  cartId = '';
  storedCartId = localStorage.getItem('cartId');
  isNotLoggedIn = localStorage.getItem('token') === null;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.cartId = this.storedCartId ? this.storedCartId : '';
    this.store.dispatch(CartActions.loadCartItems({ cartId: this.cartId }));
  }

  logAction() {
    if (this.isNotLoggedIn) {
      this.isNotLoggedIn = false;
      this.router.navigate(['/login']);
    } else {
      localStorage.removeItem('token');
      this.isNotLoggedIn = true;
      this.router.navigate(['/']);
    }
  }
}
