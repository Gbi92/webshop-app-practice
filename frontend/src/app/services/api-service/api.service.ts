import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment.development';

import { UserData } from '../../models/userData';
import { Product } from '../../models/product';
import { News } from '../../models/news';
import {
  LoginResponse,
  NewsResponse,
  RegistrationResponse,
} from './api.service.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private basePath = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getNews(): Observable<News[]> {
    return this.http.get<NewsResponse[]>(`${this.basePath}/news`).pipe(
      map((newsList) =>
        newsList.map((item) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          imagePath: item.image_path,
          imgOrientation: item.img_orientation,
          publishDate: item.publish_date,
        }))
      )
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.basePath}/products`);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.basePath}/products/${productId}`);
  }

  getCartItems(cartId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.basePath}/carts/${cartId}`);
  }

  addItemToCart(cartId: string, productId: string): Observable<Product> {
    return this.http.post<Product>(`${this.basePath}/carts/${cartId}/item`, {
      productId,
    });
  }

  addItemsToCart(
    cartId: string,
    productId: string,
    quantity: number
  ): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.basePath}/carts/${cartId}/items`, {
      productId,
      quantity,
    });
  }

  deleteLastItemFromCart(
    cartId: string,
    product: Product
  ): Observable<{ deleteMsg: string }> {
    return this.http.delete<{ deleteMsg: string }>(
      `${this.basePath}/carts/${cartId}/items/${product.id}/last`
    );
  }

  deleteItemsFromCart(
    cartId: string,
    product: Product
  ): Observable<{ deleteMsg: string }> {
    return this.http.delete<{ deleteMsg: string }>(
      `${this.basePath}/carts/${cartId}/items/${product.id}`
    );
  }

  emptyCart(cartId: string): Observable<{ deleteMsg: string }> {
    return this.http.delete<{ deleteMsg: string }>(
      `${this.basePath}/carts/${cartId}`
    );
  }

  register(userData: UserData): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.basePath}/register`, {
      name: userData.username,
      email: userData.email,
      password: userData.password,
    });
  }

  login(userData: UserData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.basePath}/login`, {
      email: userData.email,
      password: userData.password,
    });
  }
}
