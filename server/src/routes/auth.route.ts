import express from 'express';
import authController from '../controllers/auth.controllers';
import validate from '../middlewares/validate';
import authValidation from '../middlewares/validations/auth.validation';
// import auth from '../../middlewares/auth';

const router = express.Router();


router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token',  authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
;
export default router;



