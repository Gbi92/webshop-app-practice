import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingService } from '../../services/shopping-service/shopping.service';
import { Product } from '../../models/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  productList: Product[] = [];
  private addedProductSub!: Subscription;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.addedProductSub = this.shoppingService.addedProductEmitter.subscribe(
      (addedProduct) => {
        this.productList.push(addedProduct);
      }
    );
  }

  ngOnDestroy(): void {
    this.addedProductSub.unsubscribe();
  }
}
