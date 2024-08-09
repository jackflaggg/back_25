import {body} from "express-validator";

export const contentValidator  = body('content')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({min: 20, max: 300})
    .withMessage('more then 300 or min 20')
