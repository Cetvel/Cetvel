import { body, param, ValidationChain } from 'express-validator';

const tytValidition: ValidationChain[] = [
    param('examId').optional().isMongoId().withMessage("Geçerli bir Exam ID'si gerekli"),
    body('examField').isIn(['tyt']).withMessage('Geçerli bir sınav türü gerekli'),
    body('examName').isString().notEmpty().withMessage('Sınav adı gerekli'),
    body('examDate').optional().isISO8601().toDate().withMessage('Geçerli bir tarih gerekli'),
    body('solvingTime').optional().isInt({ min: 0 }).isInt({ max: 135 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),

    body('math.solvingTime').optional().isInt({ min: 0 }).isInt({ max: 135 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("math.correct").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.wrong").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.empty").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),

    body('turkish.solvingTime').optional().isInt({ min: 0 }).isInt({ max: 135 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("turkish.correct").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("turkish.wrong").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("turkish.empty").isInt({ min: 0 }).isInt({ max: 40 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),

    body('science.solvingTime').optional().isInt({ min: 0 }).isInt({ max: 135 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("science.correct").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("science.wrong").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("science.empty").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),

    body('social.solvingTime').optional().isInt({ min: 0 }).isInt({ max: 135 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("social.correct").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("social.wrong").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("social.empty").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
]



const aytSayValidation: ValidationChain[] = [
    param('examId').optional().isMongoId().withMessage("Geçerli bir Exam ID'si gerekli"),
    body('examField').isIn(['ayt']).withMessage('Geçerli bir sınav türü gerekli'),
    body('aytField').isIn(['say']).withMessage('Ayt alanı sayısal olmalı'),
    body('examName').isString().notEmpty().withMessage('Sınav adı gerekli'),
    body('examDate').optional().isISO8601().toDate().withMessage('Geçerli bir tarih gerekli'),
    body('solvingTime').optional().isInt({ min: 0 }).isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),

    body("math.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("math.correct").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.wrong").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.empyt").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("physics.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("physics.correct").isFloat({ min: 0 }).isFloat({ max: 14 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("physics.wrong").isFloat({ min: 0 }).isFloat({ max: 14 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("physics.empyt").isFloat({ min: 0 }).isFloat({ max: 14 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("chemistry.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("chemistry.correct").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("chemistry.wrong").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("chemistry.empyt").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("biology.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("biology.correct").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("biology.wrong").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("biology.empyt").isFloat({ min: 0 }).isFloat({ max: 13 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
]

const aytEaValidation: ValidationChain[] = [
    param('examId').optional().isMongoId().withMessage("Geçerli bir Exam ID'si gerekli"),
    body('examField').isIn(['ayt']).withMessage('Geçerli bir sınav türü gerekli'),
    body('aytField').isIn(['ea']).withMessage('Ayt alanı ea olmalı'),
    body('examName').isString().notEmpty().withMessage('Sınav adı gerekli'),
    body('examDate').optional().isISO8601().toDate().withMessage('Geçerli bir tarih gerekli'),
    body('correctAnswers').isInt({ min: 0 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body('wrongAnswers').isInt({ min: 0 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body('empyt').isInt({ min: 0 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    body('solvingTime').optional().isInt({ min: 0 }).isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),

    body("math.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("math.correct").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.wrong").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.empyt").isFloat({ min: 0 }).isFloat({ max: 40 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("literature.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("literature.correct").isFloat({ min: 0 }).isFloat({ max: 24 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("literature.wrong").isFloat({ min: 0 }).isFloat({ max: 24 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("literature.empyt").isFloat({ min: 0 }).isFloat({ max: 24 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("history1.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("history1.correct").isFloat({ min: 0 }).isFloat({ max: 10 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("history1.wrong").isFloat({ min: 0 }).isFloat({ max: 10 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("history1.empyt").isFloat({ min: 0 }).isFloat({ max: 10 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("geography1.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("geography1.correct").isFloat({ min: 0 }).isFloat({ max: 6 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("geography1.wrong").isFloat({ min: 0 }).isFloat({ max: 6 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("geography1.empyt").isFloat({ min: 0 }).isFloat({ max: 6 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
]

const aytSozValidation: ValidationChain[] = [
    param('examId').optional().isMongoId().withMessage("Geçerli bir Exam ID'si gerekli"),
    body('examField').isIn(['ayt']).withMessage('Geçerli bir sınav türü gerekli'),
    body('aytField').isIn(['soz']).withMessage('Ayt alanı soz olmalı'),
    body('examName').isString().notEmpty().withMessage('Sınav adı gerekli'),
    body('examDate').optional().isISO8601().toDate().withMessage('Geçerli bir tarih gerekli'),
    body('correctAnswers').isInt({ min: 0 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body('wrongAnswers').isInt({ min: 0 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body('empyt').isInt({ min: 0 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    body('solvingTime').optional().isInt({ min: 0 }).isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),

    body("literature.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("literature.correct").isFloat({ min: 0 }).isFloat({ max: 24 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("literature.wrong").isFloat({ min: 0 }).isFloat({ max: 24 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("literature.empyt").isFloat({ min: 0 }).isFloat({ max: 24 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("philosophy.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("philosophy.correct").isFloat({ min: 0 }).isFloat({ max: 12 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("philosophy.wrong").isFloat({ min: 0 }).isFloat({ max: 12 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("philosophy.empyt").isFloat({ min: 0 }).isFloat({ max: 12 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    
    body("religion.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("religion.correct").isFloat({ min: 0 }).isFloat({ max: 6 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("religion.wrong").isFloat({ min: 0 }).isFloat({ max: 6 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("religion.empyt").isFloat({ min: 0 }).isFloat({ max: 6 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
   
    body("history2.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("history2.correct").isFloat({ min: 0 }).isFloat({ max: 11 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("history2.wrong").isFloat({ min: 0 }).isFloat({ max: 11 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("history2.empyt").isFloat({ min: 0 }).isFloat({ max: 11 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),

    body("geography2.solvingTime").optional().isInt({ max: 180 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    body("geography2.correct").isFloat({ min: 0 }).isFloat({ max: 11 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("geography2.wrong").isFloat({ min: 0 }).isFloat({ max: 11 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("geography2.empyt").isFloat({ min: 0 }).isFloat({ max: 11 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
]

const lgsValidation : ValidationChain[] = [
    param('examId').optional().isMongoId().withMessage("Geçerli bir Exam ID'si gerekli"),
    body('examField').isIn(['lgs']).withMessage('Geçerli bir sınav türü gerekli'),
    body('examName').isString().notEmpty().withMessage('Sınav adı gerekli'),
    body('examDate').optional().isISO8601().toDate().withMessage('Geçerli bir tarih gerekli'),
    body('correctAnswers').isInt({ min: 0 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body('wrongAnswers').isInt({ min: 0 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body('empyt').isInt({ min: 0 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    body('solvingTime').optional().isInt({ min: 0 }).isInt({ max: 155 }).withMessage('Çözüm süresi pozitif bir tamsayı olmalı'),
    
    body("turkish.correct").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("turkish.wrong").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("turkish.empyt").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    
    body("math.correct").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.wrong").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("math.empyt").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    
    body("science.correct").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("science.wrong").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("science.empyt").isInt({ min: 0 }).isInt({ max: 20 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    
    body("social.correct").isInt({ min: 0 }).isInt({ max: 10 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("social.wrong").isInt({ min: 0 }).isInt({ max: 10 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("social.empyt").isInt({ min: 0 }).isInt({ max: 10 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    
    body("english.correct").optional().isInt({ min: 0 }).isInt({ max: 10 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("english.wrong").optional().isInt({ min: 0 }).isInt({ max: 10 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("english.empyt").optional().isInt({ min: 0 }).isInt({ max: 10 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
    
    body("religious.correct").optional().isInt({ min: 0 }).isInt({ max: 10 }).withMessage('Doğru cevap sayısı pozitif bir tamsayı olmalı'),
    body("religious.wrong").optional().isInt({ min: 0 }).isInt({ max: 10 }).withMessage('Yanlış cevap sayısı pozitif bir tamsayı olmalı'),
    body("religious.empyt").optional().isInt({ min: 0 }).isInt({ max: 10 }).withMessage('Boş cevap sayısı pozitif bir tamsayı olmalı'),
]

const deleteExam: ValidationChain[] = [
    param('examId').isMongoId().withMessage("Geçerli bir Exam ID'si gerekli")
];

export default {
    aytSozValidation,
    tytValidition,
    aytSayValidation,
    aytEaValidation,
    lgsValidation,
    deleteExam,
}