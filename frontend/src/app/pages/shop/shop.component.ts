import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../models/products';
import { ApiService } from '../../services/api-service/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  @Output() cartIncreased: EventEmitter<number> = new EventEmitter();
  products: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getProducts()
      .subscribe((productList) => (this.products = productList));
  }

  onProductAdded(cartItemCount: number) {
    this.cartIncreased.emit(cartItemCount);
  }
}
