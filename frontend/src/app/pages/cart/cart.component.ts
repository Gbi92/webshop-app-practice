import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  EMPTY,
  Observable,
  concatMap,
  filter,
  from,
  groupBy,
  mergeMap,
  reduce,
  take,
  tap,
  toArray,
} from 'rxjs';
import { Store } from '@ngrx/store';

import { CartProduct, Product, emptyProduct } from '../../models/products';
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
  groupedCartItems$: Observable<CartProduct[]> = EMPTY;

  constructor(private store: Store) {
    this.cartId = this.storedCartId ? this.storedCartId : '';
    this.store.dispatch(CartActions.loadCartItems({ cartId: this.cartId }));
  }

  ngOnInit(): void {
    // TODO: group items in store
    this.groupedCartItems$ = this.cartItemList$.pipe(
      take(2),
      filter((array) => array.length > 0),
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
      tap((a) => console.log(a))
    );
  }

  // TODO: if empty show message on page

  addOneProduct(productId: number) {
    this.store.dispatch(
      CartActions.addItem({ cartId: this.cartId, productId })
    );
  }
}
