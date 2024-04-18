import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCartLength } from '../../store/cart/cart.selector';
import { CartActions } from '../../store/cart/cart.actions';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  cartCounter = this.store.select(selectCartLength);
  cartId = '';
  storedCartId = localStorage.getItem('cartId');
  isLoggedin: Observable<boolean>;

  constructor(private store: Store, public authService: AuthService) {
    this.isLoggedin = authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.cartId = this.storedCartId ? this.storedCartId : '';
    this.store.dispatch(CartActions.loadCartItems({ cartId: this.cartId }));
  }
}
