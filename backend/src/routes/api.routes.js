import express from 'express';
import cors from 'cors';
import { helloController } from '../controllers';
import { newsController } from '../controllers/newsController';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.get('/news', newsController.getNewsData);

export default router;
