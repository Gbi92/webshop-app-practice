import { Component, Input } from '@angular/core';
import { Product } from '../../models/products';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  imgBasePath = `${environment.apiUrl}/images/`;
}
