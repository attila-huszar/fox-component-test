import express from 'express';
import status from 'http-status';
import apiErrorHandler from '../middlewares/apiErrorHandler';
import * as helloController from '../controllers/helloController';
import * as productController from '../controllers/productController';
import { HttpError } from '../errors';

const router = express.Router();

router.use(express.json());

router.get('/hello', helloController.getHelloWorld);
router.post('/admin/products', productController.addNewProduct);
router.get('/admin/product', productController.getProductById);
router.get('/product', productController.getProductById);
router.get('/products', productController.getAllProduct);
router.use('/*', (req, res, next) => next(new HttpError(status.NOT_FOUND)));
router.use(apiErrorHandler);

export default router;
