export interface Product {
  id: number;
  name: string;
  price: number;
  image_path: string;
  description: string;
  type: string;
}

export const emptyProduct = {
  id: -1,
  name: '',
  price: -1,
  image_path: '',
  description: '',
  type: '',
};

export interface CartProduct {
  product: Product;
  quantity: number;
  totalPrice: number;
}
