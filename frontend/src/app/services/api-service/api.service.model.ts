export interface RegistrationResponse {
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
}

export interface LoginResponse {
  status: string;
  token: string;
}

export interface CartResponse {
  cart_id: string;
  product_id: number;
}
