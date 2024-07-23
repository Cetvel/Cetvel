import express from 'express';
const router = express.Router();

import userController from '../controllers/user.controllers';
import authenticateToken from '../middlewares/authenticateToken';


router.get('/info', authenticateToken ,userController.getUsersInfo);


export default router;