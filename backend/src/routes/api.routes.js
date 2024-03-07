import express from 'express';
import cors from 'cors';
import { helloController } from '../controllers';
import { newsController } from '../controllers/newsController';
import { registrationController } from '../controllers/registrationController';
import { loginController } from '../controllers/loginController';
import { productController } from '../controllers/productController';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.get('/news', newsController.getNewsData);
router.get('/products', productController.getAllProductData);
router.post('/register', registrationController.registerUser);
router.post('/login', loginController.login)

export default router;
