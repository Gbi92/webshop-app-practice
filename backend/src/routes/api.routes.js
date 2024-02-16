import express from 'express';
import cors from 'cors';
import { helloController } from '../controllers';
import { newsController } from '../controllers/newsController';
import { registrationController } from '../controllers/registrationController';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.get('/news', newsController.getNewsData);
router.post('/register', registrationController.registerUser);

export default router;
