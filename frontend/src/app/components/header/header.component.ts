import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../../services/api-service/api.service';
import { toArray } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() cartCounter = 0;
  cartId = '';
  storedCartId = localStorage.getItem('cartId');

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cartId = this.storedCartId ? this.storedCartId : '';
    this.apiService
      .getCartItems(this.cartId)
      .pipe(toArray())
      .subscribe((cartResponse) => (this.cartCounter = cartResponse.length));
  }
}
