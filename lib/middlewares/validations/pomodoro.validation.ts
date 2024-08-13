import { body, ValidationChain } from "express-validator";

const pomodoroValidation : ValidationChain[ ] = [
    body('title').isString().isLength({min: 3}),
    body('tag').isString(),
    body('duration').isNumeric(),
]

export default pomodoroValidation