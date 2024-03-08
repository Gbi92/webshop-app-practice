import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.development';

import { Product } from '../../models/products';
import { ShoppingService } from '../../services/shopping-service/shopping.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  imgBasePath = `${environment.apiUrl}/images/`;

  constructor(private shoppingService: ShoppingService) {}

  onAddToCart(product: Product) {
    this.shoppingService.addedProductEmitter.next(product);
    this.shoppingService.addedPlusOneEmitter.next(true);
  }
}
