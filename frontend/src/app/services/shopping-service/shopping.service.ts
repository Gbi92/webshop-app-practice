import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// TODO: maybe this is not needed
@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  addedProductEmitter = new Subject<number>();

  constructor() {}
}
