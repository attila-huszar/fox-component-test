import { Request, Response, NextFunction } from 'express';
import status, { BAD_REQUEST } from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import { GetAllProductResponse } from '../interfaces/getAllProduct';
import {
  NewProductRequest,
  NewProductResponse,
} from '../interfaces/newProduct';
import {
  GetProductRequest,
  GetProductResponse,
} from '../interfaces/getProduct';
import * as productService from '../services/productService';

export async function addNewProduct(
  req: Request<unknown, unknown, NewProductRequest, unknown>,
  res: Response<NewProductResponse>,
  next: NextFunction
): Promise<void> {
  const product = req.body;

  try {
    const result = await productService.addNewProduct(product);
    res.send(result);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}

export async function getProductById(
  req: Request<unknown, unknown, unknown, GetProductRequest>,
  res: Response<GetProductResponse>,
  next: NextFunction
): Promise<void> {
  const productId = Number(req.query.productId);

  try {
    const data = await productService.getProductById(productId);
    res.send(data);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    }
    if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    }
  }
}

export async function getAllProduct(
  req: Request,
  res: Response<GetAllProductResponse>,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productService.getAllProduct();
    res.send(data);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    }
    if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    }
  }
}
