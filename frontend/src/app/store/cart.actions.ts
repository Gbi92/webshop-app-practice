import { createActionGroup, props } from '@ngrx/store';

import { Product } from '../models/products';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Load Cart Items': props<{ cartId: string }>(),
    'Retrieved Cart Items': props<{ CartItems: Product[] }>(),
    'Cart Items Load Failure': props<{ error: Error }>(),
    'Add Item': props<{ cartId: string; productId: number }>(),
    'Add Item Success': props<{ newCartItem: Product }>(),
    'Add Item Failure': props<{ error: Error }>(),
  },
});
