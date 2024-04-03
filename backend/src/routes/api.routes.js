import express from 'express';
import cors from 'cors';

import { helloController } from '../controllers';
import { newsController } from '../controllers/newsController';
import { registrationController } from '../controllers/registrationController';
import { loginController } from '../controllers/loginController';
import { productController } from '../controllers/productController';
import { cartController } from '../controllers/cartController';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.get('/news', newsController.getNewsData);
router.get('/products', productController.getAllProductData);
router.get('/products/:productId', productController.getProductData);
router.get('/carts/:cartId', cartController.getCartData);
router.post('/carts/:cartId/item', cartController.addToCart);
router.delete('/carts/:cartId/items/:itemId/last', cartController.removeFromCart);
router.delete('/carts/:cartId/items/:itemId', cartController.removeAllFromCart);
router.delete('/carts/:cartId', cartController.emptyCart);
router.post('/register', registrationController.registerUser);
router.post('/login', loginController.login)

export default router;
