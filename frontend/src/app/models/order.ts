import { Shipping } from './shipping';

export interface OrderDetails extends Shipping {
  orderId: string;
  orderPrice: number;
  shippingPrice: number;
  country: string;
}

export interface OrderItem {
  quantity: number;
  name: string;
  price: number;
  imagePath: string;
}

export interface OrderInfo {
  orderDetails: OrderDetails;
  orderItems: OrderItem[];
}
