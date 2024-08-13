// validations/auth.validation.ts
import { body, ValidationChain } from 'express-validator';

const register: ValidationChain[] = [
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi girin'),
  body('password').isLength({ min: 4 }).withMessage('Şifre en az 4 karakter olmalıdır'),
  body('name').notEmpty().withMessage('İsim gereklidir'),
  // body('studyField').notEmpty().withMessage('Rol gereklidir').matches(/(YKS|KPSS|LGS)/)
];

const login: ValidationChain[] = [
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi girin'),
  body('password').notEmpty().withMessage('Şifre gereklidir')
];

const logout: ValidationChain[] = [
  body('refreshToken').notEmpty().withMessage('Refresh token gereklidir')
];

const refreshTokens: ValidationChain[] = [
  body('refreshToken').notEmpty().withMessage('Refresh token gereklidir')
];

const forgotPassword: ValidationChain[] = [
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi girin')
];

const resetPassword: ValidationChain[] = [
  body('token').notEmpty().withMessage('Token gereklidir'),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır')
];

const verifyEmail: ValidationChain[] = [
  body('token').notEmpty().withMessage('Token gereklidir')
];

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail
};