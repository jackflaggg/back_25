import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import {HTTP_STATUSES} from "../../types/types";
import {FieldNamesType} from "../../input-output-types/output-errors-type";

export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        const uniqueErrors = new Map<string, {message: string, field: string}>();
        errors.array({ onlyFirstError: true }).map(err => {
            if (!uniqueErrors.has(err.type)){
                uniqueErrors.set(err.type, {message: err.msg, field: err.type});
            }
        });
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(uniqueErrors);
        return;
    }
    next()
}