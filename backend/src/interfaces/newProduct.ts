import Product from '../models/Product';

export interface NewProductRequest {
  productId: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  type: string;
}
export interface NewProductResponse {
  newProduct: Product;
}
export interface GetProductRequest {
  productId: number;
}
export interface GetProductResponse {
  product: Product;
}
