import { body, ValidationChain } from 'express-validator';

const updateUser: ValidationChain[] = [
    body('name').optional().isString().withMessage('İsim gereklidir'),
    body('studyField').optional().isString().optional().withMessage('Rol gereklidir').matches(/(YKS|KPSS|LGS)/),
    body('tag').optional().isArray().optional().withMessage('Tag gereklidir'),
    body('email').not().exists().withMessage('Email alanı güncellenemez'),
    body('password').not().exists().withMessage('Password alanı güncellenemez'),
    // body('pictures').optional().withMessage('Pictures gereklidir')
]
const updateUserPassword: ValidationChain[] = [
    body('currentPassword').notEmpty().isString().withMessage('Mevcut şifre gereklidir'),
    body('newPassword').notEmpty().isString().isLength({ min: 4 }).withMessage('Yeni şifre gereklidir ve en az 4 karakter')
]


const updateUserEmail: ValidationChain[] = [
    body('email').notEmpty().isEmail().withMessage('Geçerli bir e-posta adresi girin'),
    body('password').notEmpty().isString().withMessage('Şifre gereklidir')
]

export default {
    updateUser,
    updateUserPassword,
    updateUserEmail
}