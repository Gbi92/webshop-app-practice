import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment.development';

import {
  LoginResponse,
  NewsResponse,
  OrderDetails,
  OrderItem,
  OrderResponse,
  RegistrationResponse,
} from './api.service.model';
import { UserData } from '../../models/userData';
import { Product } from '../../models/product';
import { News } from '../../models/news';
import { Country } from '../../models/country';
import { Shipping } from '../../models/shipping';
import { OrderInfo } from '../../models/order';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private basePath = `${environment.apiUrl}/api`;

  private collectOrderDetails(
    orderDetails: OrderDetails,
    orderItems: OrderItem[]
  ) {
    return {
      orderDetails: {
        orderId: orderDetails.id,
        orderPrice: orderDetails.order_price,
        shippingPrice: orderDetails.shipping_price,
        country: orderDetails.country,
        lastName: orderDetails.last_name,
        zip: orderDetails.zip_code,
        city: orderDetails.city,
        street: orderDetails.street,
        phoneNumber: orderDetails.phone_number,
        countryId: orderDetails.country_id,
        additionalAddress: orderDetails.additional_address ?? '',
        firstName: orderDetails.first_name ?? '',
      },
      orderItems: orderItems.map((orderItem) => ({
        quantity: orderItem.quantity,
        name: orderItem.name,
        price: orderItem.price,
        imagePath: orderItem.image_path,
      })),
    };
  }

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

  getCountryList(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.basePath}/country`);
  }

  addOrder(
    cartId: string,
    shippingDetails: Shipping
  ): Observable<OrderDetails> {
    return this.http.post<OrderDetails>(`${this.basePath}/order`, {
      shippingDetails,
      cartId,
    });
  }

  getOrderDetails(orderId: string): Observable<OrderInfo> {
    return this.http
      .get<OrderResponse>(`${this.basePath}/order/${orderId}`)
      .pipe(
        map((orderInfo) =>
          this.collectOrderDetails(orderInfo.orderDetails, orderInfo.orderItems)
        )
      );
  }

  finalizeOrder(orderId: string) {
    return this.http.patch(`${this.basePath}/order/${orderId}`, {
      status: 'Paid',
    });
  }

  register(userData: UserData): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.basePath}/register`, {
      name: userData.username,
      email: userData.email,
      password: userData.password,
    });
  }

  verifyEmail(userId: string, userToken: string) {
    return this.http.put(
      `${this.basePath}/users/${userId}/verify/${userToken}`,
      {}
    );
  }

  login(userData: UserData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.basePath}/login`, {
      email: userData.email,
      password: userData.password,
    });
  }
}
