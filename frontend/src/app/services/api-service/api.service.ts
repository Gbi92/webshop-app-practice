import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { NewsList } from '../../models/news';
import { Observable, concatAll, from, map } from 'rxjs';
import { UserData } from '../../models/userData';
import {
  CartResponse,
  LoginResponse,
  RegistrationResponse,
} from './api.service.model';
import { Product } from '../../models/products';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private basePath = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsList> {
    return this.http.get<NewsList>(`${this.basePath}/news`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.basePath}/products`);
  }

  getCartItems(cartId: string): Observable<Product> {
    const products = this.http.get<Product[]>(
      `${this.basePath}/carts/${cartId}`
    );
    return products.pipe(
      map((productList: Product[]) => from(productList)),
      concatAll()
    );
  }

  addItemToCart(cartId: string, productId: number): Observable<CartResponse[]> {
    return this.http.post<CartResponse[]>(`${this.basePath}/carts/item`, {
      cartId,
      productId,
    });
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