import express from 'express';
import { getProducts, addProducts,deleteProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', addProducts);
productRouter.delete("/:productId", deleteProduct);


export default productRouter;