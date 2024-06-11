import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import {HTTP_STATUSES} from "../../types/types";
import {ErrorsType, FieldNamesType} from "../../input-output-types/output-errors-type";

export const inputCheckErrorsMiddleware = (req: Request, res: Response<ErrorsType>, next: NextFunction): void => {
    const e = validationResult(req)
    if (!e.isEmpty()) {
        const eArray = e.array({onlyFirstError: true}) as { path: FieldNamesType, msg: string }[]
        // console.log(eArray)

        res
            .status(400)
            .json({
                errorsMessages: eArray.map(x => ({ message: x.msg, field: x.path}))
            })
        return
    }

    next()
};