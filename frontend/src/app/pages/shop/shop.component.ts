import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ApiService } from '../../services/api-service/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getProducts()
      .subscribe((productList) => (this.products = productList));
  }
}
