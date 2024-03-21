import { Product } from '../models/product';

export enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

export interface CartProduct {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  itemList: CartProduct[];
  totalSum: number;
  cartLength: number;
  loadingStatus: LoadingState;
  error: string;
}
