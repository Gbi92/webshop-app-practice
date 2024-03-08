import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from '../../models/products';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  addedProductEmitter = new Subject<Product>();
  addedPlusOneEmitter = new Subject<boolean>();

  constructor() {}
}
