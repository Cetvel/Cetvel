import express from 'express';
const router = express.Router();

import userController from '../controllers/user.controllers';
import authenticateToken from '../middlewares/authenticateToken';
import validate from '../middlewares/validate';
import userValidation from '../middlewares/validations/user.validation';

router.get('/info', authenticateToken, userController.getUser);
router.put('/update', authenticateToken, validate(userValidation.updateUser), userController.updateUser);
router.put('/updatePassword', authenticateToken, validate(userValidation.updateUserPassword), userController.updateUserPassword);
router.put('/updateEmail', authenticateToken, validate(userValidation.updateUserEmail), userController.updateUserEmail);
router.delete('/delete', authenticateToken, userController.deleteUser);

export default router;