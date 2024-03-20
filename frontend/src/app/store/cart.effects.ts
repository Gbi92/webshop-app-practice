import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { CartActions } from './cart.actions';
import { ApiService } from '../services/api-service/api.service';

@Injectable()
export class CartEffects {
  loadCartItems = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCartItems),
      exhaustMap((params) =>
        this.apiService.getCartItems(params.cartId).pipe(
          map((products) =>
            CartActions.retrievedCartItems({ CartItems: products })
          ),
          catchError((error) => of(CartActions.cartItemsLoadFailure({ error })))
        )
      )
    )
  );

  addItemToCart = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItem),
      exhaustMap((params) =>
        this.apiService.addItemToCart(params.cartId, params.productId).pipe(
          map((product) =>
            CartActions.addItemSuccess({ newCartItem: product })
          ),
          catchError((error) => of(CartActions.addItemFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
