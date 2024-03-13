import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { v4 as uuid } from 'uuid';

import { Product } from '../../models/products';
import { ApiService } from '../../services/api-service/api.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Output() productAdded: EventEmitter<number> = new EventEmitter();
  @Input() product!: Product;
  imgBasePath = `${environment.apiUrl}/images/`;
  cartItemCount = 0;

  constructor(private apiService: ApiService) {}

  onAddToCart(product: Product) {
    let cartId = '';
    let storedCartId = localStorage.getItem('cartId');

    if (!storedCartId) {
      cartId = uuid();
      localStorage.setItem('cartId', cartId);
    } else {
      cartId = storedCartId;
    }

    this.apiService.addItemToCart(cartId, product.id).subscribe({
      next: (res) => {
        this.cartItemCount = res.length;
      },
      error: (err) => console.log(err),
      complete: () => {
        this.productAdded.emit(this.cartItemCount);
      },
    });
  }
}
