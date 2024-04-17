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

export interface OrderResponse {
  id: string;
  user_id: string;
  status: string;
  order_date: string;
  zip_code: string;
  city: string;
  street: string;
  country_id: string;
  order_price: number;
  shipping_price: number;
}
