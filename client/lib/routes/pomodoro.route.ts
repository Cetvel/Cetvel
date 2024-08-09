import {Router}  from "express";
const router = Router(); 

import pomodoroController from '../controllers/pomodoro.controllers';
import authenticateToken from '../middlewares/authenticateToken';
import validate from '../middlewares/validate';
import pomodoroValidation from '../middlewares/validations/pomodoro.validation';


router.get("/get/:pomodoroId", authenticateToken ,pomodoroController.getPomodoroById);
router.get("/getPomodoros", authenticateToken ,pomodoroController.getPomodoros);

router.post("/create", authenticateToken ,validate(pomodoroValidation),pomodoroController.createPomodoro);
router.put("/update/:pomodoroId", authenticateToken ,validate(pomodoroValidation),pomodoroController.updatePomodoro);
router.delete("/delete/:pomodoroId", authenticateToken ,pomodoroController.deletePomodoro);

export default router