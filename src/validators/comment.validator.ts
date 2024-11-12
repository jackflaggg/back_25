import {body} from "express-validator";

export const contentValidator  =
    body('content')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .isLength({min: 20, max: 300})
    .withMessage('больше 300 символов и меньше 20 символов')
