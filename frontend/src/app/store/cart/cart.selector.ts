import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Cart } from './cart.model';

export const selectCart = createFeatureSelector<Cart>('cart');

export const selectItemList = createSelector(
  selectCart,
  (cart) => cart.itemList
);

export const selectTotalSum = createSelector(
  selectCart,
  (cart) => cart.totalSum
);

export const selectCartLength = createSelector(
  selectCart,
  (cart) => cart.cartLength
);

export const selectCartLoadingState = createSelector(
  selectCart,
  (cart) => cart.loadingStatus
);
