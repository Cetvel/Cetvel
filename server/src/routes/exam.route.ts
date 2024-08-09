import express from 'express';
const router = express.Router();

import examController from '../controllers/exam.controllers';
import authenticateToken from '../middlewares/authenticateToken';
import validate from '../middlewares/validate';
import examValidation from '../middlewares/validations/exam.validation';


router.post("/create/tyt", authenticateToken, validate(examValidation.tytValidition), examController.createExam); 
router.post("/create/ayt/say", authenticateToken, validate(examValidation.aytSayValidation), examController.createExam);
router.post("/create/ayt/ea", authenticateToken, validate(examValidation.aytEaValidation), examController.createExam);
router.post("/create/ayt/soz", authenticateToken, validate(examValidation.aytSozValidation), examController.createExam);
router.post("/create/lgs", authenticateToken, validate(examValidation.lgsValidation), examController.createExam);
// router.post("/create/kpss", authenticateToken, validate(examValidation.createKpss), examController.createExam);



router.put('/update/tyt/:examId', authenticateToken, validate(examValidation.tytValidition), examController.updateExam);
router.put('/update/ayt/say/:examId', authenticateToken, validate(examValidation.aytSayValidation), examController.updateExam);
router.put('/update/ayt/ea/:examId', authenticateToken, validate(examValidation.aytEaValidation), examController.updateExam);
router.put('/update/ayt/soz/:examId', authenticateToken, validate(examValidation.aytSozValidation), examController.updateExam);
router.put('/update/lgs/:examId', authenticateToken, validate(examValidation.lgsValidation), examController.updateExam);
// router.put('/update/kpss/:examId', authenticateToken, validate(examValidation.updateKpss), examController.updateExam);


router.delete('/delete/:examId', authenticateToken, validate(examValidation.deleteExam), examController.deleteExam);



// router.get('/getExam/:examId', authenticateToken, examController.getExam)
router.get('/getExamsByType', authenticateToken, examController.getUserExamsByType);
router.get('/getUserExams', authenticateToken, examController.getUserExams);
router.get('/getUserTodosByDateRange', authenticateToken, examController.getUserExamsByDateRange);
router.get('/getUserExamStatistics', authenticateToken, examController.getUserExamStatistics);

export default router;

