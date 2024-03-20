import { Product } from '../models/products';

export enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

export interface Cart {
  itemList: Product[];
  totalSum: number;
  cartLength: number;
  loadingStatus: LoadingState;
  error: string;
}
