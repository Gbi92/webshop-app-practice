import express from 'express';
import cors from 'cors';

import { newsController } from '../controllers/newsController';
import { registrationController } from '../controllers/registrationController';
import { loginController } from '../controllers/loginController';
import { productController } from '../controllers/productController';
import { cartController } from '../controllers/cartController';
import { orderController } from '../controllers/orderController';
import { countryController } from '../controllers/countryController';

import { authorization } from '../middlewares/authorization-handler';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/news', newsController.getNewsData);
router.get('/products', productController.getAllProductData);
router.get('/products/:productId', productController.getProductData);
router.get('/carts/:cartId', cartController.getCartData);
router.post('/carts/:cartId/item', cartController.addItemToCart);
router.post('/carts/:cartId/items', cartController.addItemsToCart);
router.delete('/carts/:cartId/items/:itemId/last', cartController.removeFromCart);
router.delete('/carts/:cartId/items/:itemId', cartController.removeAllFromCart);
router.delete('/carts/:cartId', cartController.emptyCart);
router.post('/register', registrationController.registerUser);
router.post('/login', loginController.login);

router.use(authorization);
// authenticated endpoints
router.get('/country', countryController.getCountryData);
router.get('/order/:orderId', orderController.getOrder);
router.post('/order', orderController.addOrder);

export default router;
