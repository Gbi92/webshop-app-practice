import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { v4 as uuid } from 'uuid';

import { Product } from '../../models/products';
import { ShoppingService } from '../../services/shopping-service/shopping.service';
import { ApiService } from '../../services/api-service/api.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  imgBasePath = `${environment.apiUrl}/images/`;
  cartCounter = 0;

  constructor(
    private shoppingService: ShoppingService,
    private apiService: ApiService
  ) {}

  onAddToCart(product: Product) {
    let cartId = '';
    let storedCartId = localStorage.getItem('cartId');

    if (!storedCartId) {
      cartId = uuid();
      localStorage.setItem('cartId', cartId);
    } else {
      cartId = storedCartId;
    }

    this.apiService
      .addItemToCart(cartId, product.id)
      .subscribe((cartContent) => {
        this.cartCounter = cartContent.length;
      });
  }
}
