import { createActionGroup, props } from '@ngrx/store';

import { Product } from '../models/product';
import { CartProduct } from './cart.model';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Load Cart Items': props<{ cartId: string }>(),
    'Retrieved Cart Items': props<{ CartItems: CartProduct[] }>(),
    'Cart Items Load Failure': props<{ error: Error }>(),
    'Add Item': props<{ cartId: string; productId: number }>(),
    'Add Item Success': props<{ newCartItem: Product }>(),
    'Add Item Failure': props<{ error: Error }>(),
    'Delete Last Item': props<{ cartId: string; product: Product }>(),
    'Delete Last Item Success': props<{ removedProduct: Product }>(),
    'Delete Last Item Failure': props<{ error: Error }>(),
    'Delete All Items': props<{ cartId: string; product: Product }>(),
    'Delete All Items Success': props<{ removedProduct: Product }>(),
    'Delete All Items Failure': props<{ error: Error }>(),
  },
});
