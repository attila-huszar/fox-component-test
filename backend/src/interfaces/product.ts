import Product from '../models/Product';
import * as productRepo from '../repositories/productRepo';
import { z } from 'zod';

export interface GetAllProductsResponse {
  allProducts: Product[];
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  type: string;
}

export const NewProductRequestValidator = z
  .object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().positive().min(1, 'Price is required'),
    duration: z.number().positive().min(1, 'Duration is required'),
    description: z.string().min(1, 'Description is required'),
    type: z.enum(['pass', 'ticket']),
  })
  .refine(async productRequest => {
    const product = await productRepo.getProductByName(productRequest.name);
    return !product;
  }, 'Name already exists');

export type NewProductRequest = z.infer<typeof NewProductRequestValidator>;
