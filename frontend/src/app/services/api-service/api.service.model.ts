export interface RegistrationResponse {
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
}

export interface LoginResponse {
  status: string;
  token: string;
}
