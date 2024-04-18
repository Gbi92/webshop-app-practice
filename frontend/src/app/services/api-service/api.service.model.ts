export interface NewsResponse {
  id: string;
  title: string;
  content: string;
  image_path: string;
  img_orientation: 'vertical' | 'horizontal';
  publish_date: number;
}

export interface RegistrationResponse {
  email: string;
  is_admin: boolean;
  is_verified: boolean;
}

export interface LoginResponse {
  status: string;
  token: string;
}

export interface OrderDetails {
  id: string;
  user_id: string;
  status: string;
  order_date: string;
  last_name: string;
  first_name: string;
  zip_code: string;
  city: string;
  street: string;
  country_id: string;
  additional_address: string;
  phone_number: string;
  order_price: number;
  shipping_price: number;
  country: string;
}

export interface OrderItem {
  quantity: number;
  name: string;
  price: number;
  image_path: string;
}

export interface OrderResponse {
  orderDetails: OrderDetails;
  orderItems: OrderItem[];
}
