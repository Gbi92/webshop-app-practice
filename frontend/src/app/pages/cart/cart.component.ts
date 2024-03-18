import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';

import { CartProduct, Product, emptyProduct } from '../../models/products';
import { ApiService } from '../../services/api-service/api.service';
import { EMPTY, Observable, groupBy, mergeMap, reduce, toArray } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartId = '';
  cartItemList: Observable<CartProduct[]> = EMPTY;
  storedCartId = localStorage.getItem('cartId');
  imgBasePath = `${environment.apiUrl}/images/`;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cartId = this.storedCartId ? this.storedCartId : '';
    this.cartItemList = this.apiService.getCartItems(this.cartId).pipe(
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
      toArray()
    );
    // TODO: if empty show message on page
  }
}
