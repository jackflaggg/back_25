import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import {ErrorsType, FieldNamesType, HTTP_STATUSES} from "../../models/common/common-types";

export const inputCheckErrorsMiddleware = (req: Request, res: Response<ErrorsType>, next: NextFunction): void => {
    const e = validationResult(req);
    if (!e.isEmpty()) {
        const eArray = e.array({onlyFirstError: true}) as { path: FieldNamesType, msg: string }[]

        if (eArray.find(err => err?.path === 'id')){
            res
                .sendStatus(HTTP_STATUSES.NOT_FOUND_404)
                return;
        }
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json({
                errorsMessages: eArray.map(x => ({ message: x.msg, field: x.path}))
            })
        return
    }

    next()
};