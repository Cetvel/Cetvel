import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map((validation: ValidationChain) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            message: "Express Validation Error", errors: errors.array()
        });
    };
};

export default validate;
