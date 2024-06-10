import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";

export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const err = validationResult(req);
    if (!err.isEmpty()){

    }
}