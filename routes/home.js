import express from 'express';
import homeController from '../controllers/home.js';

const router = express.Router();

router.get('/', homeController.getHomeData);

export default router;