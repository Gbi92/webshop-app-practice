import { createReducer, on } from '@ngrx/store';
import { Cart, LoadingState } from './cart.model';
import { CartActions } from './cart.actions';
import { Product } from '../models/products';

export const initialState: Cart = {
  itemList: [],
  totalSum: 0,
  cartLength: 0,
  loadingStatus: LoadingState.INIT,
  error: '',
};

export const cartReducer = createReducer(
  initialState,

  on(CartActions.retrievedCartItems, (state, { CartItems }) => ({
    ...state,
    itemList: [...CartItems],
    cartLength: CartItems.length,
    totalSum: CartItems.reduce(
      (acc: number, curr: Product) => acc + curr.price,
      0
    ),
    loadingStatus: LoadingState.LOADED,
  })),

  on(CartActions.cartItemsLoadFailure, (state, { error }) => ({
    ...state,
    loadingStatus: LoadingState.ERROR,
    error: error.message,
  })),

  on(CartActions.addItemSuccess, (state, { newCartItem }) => ({
    ...state,
    itemList: [...state.itemList, newCartItem],
    cartLength: state.cartLength + 1,
    totalSum: state.totalSum + newCartItem.price,
  })),

  on(CartActions.addItemFailure, (state, { error }) => ({
    ...state,
    loadingStatus: LoadingState.ERROR,
    error: error.message,
  }))
);
