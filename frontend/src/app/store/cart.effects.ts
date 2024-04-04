import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  exhaustMap,
  from,
  groupBy,
  map,
  mergeMap,
  of,
  reduce,
  toArray,
} from 'rxjs';

import { CartActions } from './cart.actions';
import { ApiService } from '../services/api-service/api.service';
import { Product, emptyProduct } from '../models/product';
import { CartProduct } from './cart.model';

@Injectable()
export class CartEffects {
  loadCartItems = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCartItems),
      exhaustMap((params) =>
        this.apiService.getCartItems(params.cartId).pipe(
          concatMap((productList: Product[]) => from(productList)),
          groupBy((product) => product.id),
          mergeMap((group) =>
            group.pipe(
              reduce(
                (acc: CartProduct, curr: Product) => {
                  if (acc.quantity === 0) {
                    acc.product = curr;
                  }
                  acc.quantity += 1;
                  acc.totalPrice += curr.price;
                  return acc;
                },
                {
                  quantity: 0,
                  totalPrice: 0,
                  product: emptyProduct,
                }
              )
            )
          ),
          toArray(),
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

  addItemsToCart = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItems),
      exhaustMap((params) =>
        this.apiService
          .addItemsToCart(params.cartId, params.productId, params.quantity)
          .pipe(
            map((products) =>
              CartActions.addItemsSuccess({
                newCartItem: products[0],
                quantity: params.quantity,
              })
            ),
            catchError((error) => of(CartActions.addItemsFailure({ error })))
          )
      )
    )
  );

  deleteLastItemFromCart = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.deleteLastItem),
      exhaustMap((params) =>
        this.apiService
          .deleteLastItemFromCart(params.cartId, params.product)
          .pipe(
            map((result) =>
              CartActions.deleteLastItemSuccess({
                removedProduct: params.product,
              })
            ),
            catchError((error) =>
              of(CartActions.deleteLastItemFailure({ error }))
            )
          )
      )
    )
  );

  deleteItemsFromCart = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.deleteAllItems),
      exhaustMap((params) =>
        this.apiService.deleteItemsFromCart(params.cartId, params.product).pipe(
          map((result) =>
            CartActions.deleteAllItemsSuccess({
              removedProduct: params.product,
            })
          ),
          catchError((error) =>
            of(CartActions.deleteAllItemsFailure({ error }))
          )
        )
      )
    )
  );

  emptyCart = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.emptyCart),
      exhaustMap((params) =>
        this.apiService.emptyCart(params.cartId).pipe(
          map((result) => CartActions.emptyCartSuccess()),
          catchError((error) => of(CartActions.emptyCartFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
