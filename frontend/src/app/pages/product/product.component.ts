import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  imgBasePath = `${environment.apiUrl}/images/`;
  productId!: number;
  product!: Product;
  quantity = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['productId'];
    });
    this.apiService
      .getProduct(this.productId)
      .subscribe((product) => (this.product = product));
  }

  increaseQuantity() {
    if (this.quantity <= 100) {
      this.quantity = this.quantity + 1;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity = this.quantity - 1;
    }
  }

  addToCart() {
    // TODO
    console.log('added', this.quantity, this.productId);
  }
}
