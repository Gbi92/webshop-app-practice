import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { NewsList } from '../../models/news';
import { UserData } from '../../models/userData';
import { LoginResponse, RegistrationResponse } from './api.service.model';
import { Product } from '../../models/product';

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

  getCartItems(cartId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.basePath}/carts/${cartId}`);
  }

  addItemToCart(cartId: string, productId: number): Observable<Product> {
    return this.http.post<Product>(`${this.basePath}/carts/${cartId}/item`, {
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
