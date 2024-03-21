import { createReducer, on } from '@ngrx/store';

import { Cart, LoadingState } from './cart.model';
import { CartActions } from './cart.actions';
import { Product } from '../models/product';

export const initialState: Cart = {
  itemList: [],
  totalSum: 0,
  cartLength: 0,
  loadingStatus: LoadingState.INIT,
  error: '',
};

const appendItemToCart = (state: Cart, newCartItem: Product) => {
  let found = false;
  const items = state.itemList.map((item) => {
    if (item.product.id === newCartItem.id) {
      found = true;
      return {
        ...item,
        quantity: item.quantity + 1,
        totalPrice: item.totalPrice + newCartItem.price,
      };
    }
    return item;
  });

  if (found) {
    return items;
  } else {
    return [
      ...state.itemList,
      {
        product: newCartItem,
        quantity: 1,
        totalPrice: newCartItem.price,
      },
    ];
  }
};

export const cartReducer = createReducer(
  initialState,

  on(CartActions.retrievedCartItems, (state, { CartItems }) => ({
    ...state,
    itemList: [...CartItems],
    cartLength: CartItems.reduce((acc, curr) => acc + curr.quantity, 0),
    totalSum: CartItems.reduce((acc, curr) => acc + curr.totalPrice, 0),
    loadingStatus: LoadingState.LOADED,
  })),

  on(CartActions.cartItemsLoadFailure, (state, { error }) => ({
    ...state,
    loadingStatus: LoadingState.ERROR,
    error: error.message,
  })),

  on(CartActions.addItemSuccess, (state, { newCartItem }) => ({
    ...state,
    itemList: appendItemToCart(state, newCartItem),
    cartLength: state.cartLength + 1,
    totalSum: state.totalSum + newCartItem.price,
  })),

  on(CartActions.addItemFailure, (state, { error }) => ({
    ...state,
    loadingStatus: LoadingState.ERROR,
    error: error.message,
  }))
);
