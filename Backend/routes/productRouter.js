import express from 'express';
import { getProducts, addProducts,deleteProduct, updateProduct, getProductById, searchProducts } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', addProducts);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);
productRouter.get("/:productId", getProductById);
productRouter.get("/search/:query", searchProducts);

export default productRouter;