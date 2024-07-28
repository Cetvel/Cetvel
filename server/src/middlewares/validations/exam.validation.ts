import { body, param, ValidationChain } from 'express-validator';

const tytValidition: ValidationChain[] = [
    param('examId').optional().isMongoId().withMessage("Geçerli bir Exam ID'si gerekli"),
    body('examField').isIn(['tyt']).withMessage('Geçerli bir sınav türü gerekli'),
    body('examName').isString().notEmpty().withMessage('Sınav adı gerekli'),
    body('examDate').optional().isISO8601().toDate().withMessage('Geçerli bir tarih gerekli'),
    body('correctAnswers').isInt({ min: 0 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body('wrongAnswers').isInt({ min: 0 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body('emptyAnswers').isInt({ min: 0 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    body('totalNet').isFloat({ max: 120 }).withMessage('Toplam net pozitif bir sayı olmalı'),
    body('solvingTime').optional().isInt({ min: 0 }).isInt({ max: 135 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),

    body("math.true").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.false").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.emptyAnswers").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.totalNet").isFloat({ max: 40 }).withMessage('Toplam net 20 den fazla olamaz'),

    body("turkish.true").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("turkish.false").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("turkish.emptyAnswers").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    body("turkish.totalNet").isFloat({ max: 40 }).withMessage('Toplam net 20 den fazla olamaz'),

    body("science.true").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("science.false").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("science.emptyAnswers").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    body("science.totalNet").isFloat({ max: 20 }).withMessage('Toplam net 20 den fazla olamaz'),

    body("social.true").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("social.false").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("social.emptyAnswers").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    body("social.totalNet").isFloat({ max: 20 }).withMessage('Toplam net 20 den fazla olamaz')
]

const aytSayValidation: ValidationChain[] = [
    param('examId').optional().isMongoId().withMessage("Geçerli bir Exam ID'si gerekli"),
    body('examField').isIn(['ayt']).withMessage('Geçerli bir sınav türü gerekli'),
    body('aytField').isIn(['say']).withMessage('Ayt alanı sayısal olmalı'),
    body('examName').isString().notEmpty().withMessage('Sınav adı gerekli'),
    body('examDate').optional().isISO8601().toDate().withMessage('Geçerli bir tarih gerekli'),
    body('correctAnswers').isInt({ min: 0 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body('wrongAnswers').isInt({ min: 0 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body('emptyAnswers').isInt({ min: 0 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    body('totalNet').isFloat({ max: 80 }).withMessage('Toplam net pozitif bir sayı olmalı'),
    body('solvingTime').optional().isInt({ min: 0 }).isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),

    body("math.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("math.true").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.false").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.emptyAnswers").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.totalNet").isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("physics.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("physics.true").isFloat({ min: 0 }).isFloat({ max: 14 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("physics.false").isFloat({ min: 0 }).isFloat({ max: 14 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("physics.emptyAnswers").isFloat({ min: 0 }).isFloat({ max: 14 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("physics.totalNet").isFloat({ max: 14 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("chemistry.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("chemistry.true").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("chemistry.false").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("chemistry.emptyAnswers").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("chemistry.totalNet").isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("biology.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("biology.true").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("biology.false").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("biology.emptyAnswers").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("biology.totalNet").isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
]

const aytEaValidation: ValidationChain[] = [
    param('examId').optional().isMongoId().withMessage("Geçerli bir Exam ID'si gerekli"),
    body('examField').isIn(['ayt']).withMessage('Geçerli bir sınav türü gerekli'),
    body('aytField').isIn(['ea']).withMessage('Ayt alanı ea olmalı'),
    body('examName').isString().notEmpty().withMessage('Sınav adı gerekli'),
    body('examDate').optional().isISO8601().toDate().withMessage('Geçerli bir tarih gerekli'),
    body('correctAnswers').isInt({ min: 0 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body('wrongAnswers').isInt({ min: 0 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body('emptyAnswers').isInt({ min: 0 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    body('totalNet').isFloat({ max: 80 }).withMessage('Toplam net pozitif bir sayı olmalı'),
    body('solvingTime').optional().isInt({ min: 0 }).isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),

    body("math.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("math.true").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.false").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.emptyAnswers").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.totalNet").isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("literature.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("literature.true").isFloat({ min: 0 }).isFloat({ max: 24 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("literature.false").isFloat({ min: 0 }).isFloat({ max: 24 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("literature.emptyAnswers").isFloat({ min: 0 }).isFloat({ max: 24 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("literature.totalNet").isFloat({ max: 24 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("history1.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("history1.true").isFloat({ min: 0 }).isFloat({ max: 10 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("history1.false").isFloat({ min: 0 }).isFloat({ max: 10 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("history1.emptyAnswers").isFloat({ min: 0 }).isFloat({ max: 10 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("history1.totalNet").isFloat({ max: 10 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("geography1.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("geography1.true").isFloat({ min: 0 }).isFloat({ max: 6 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("geography1.false").isFloat({ min: 0 }).isFloat({ max: 6 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("geography1.emptyAnswers").isFloat({ min: 0 }).isFloat({ max: 6 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("geography1.totalNet").isFloat({ max: 6 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
]




const deleteExam: ValidationChain[] = [
    param('examId').isMongoId().withMessage("Geçerli bir Exam ID'si gerekli")
];

export default {
    tytValidition,
    aytSayValidation,
    aytEaValidation,
    deleteExam,
}