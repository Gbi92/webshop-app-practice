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
