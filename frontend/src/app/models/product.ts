export interface Product {
  id: string;
  name: string;
  price: number;
  image_path: string;
  description: string;
  type: string;
}

export const emptyProduct = {
  id: '',
  name: '',
  price: -1,
  image_path: '',
  description: '',
  type: '',
};
