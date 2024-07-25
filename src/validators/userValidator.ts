import {body} from "express-validator";
import {inputCheckErrorsMiddleware} from "../middlewares/checkErrorsValidator";

export const loginValidator  = body('login')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({min: 3, max: 10})
    .withMessage('more then 10 or min 3')
    .matches(/^[a-zA-Z0-9_-]*$/)
    .withMessage('login must be a valid');

export const passwordValidator  = body('password')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({min: 6, max: 20})
    .withMessage('more then 20 or min 3');

export const emailValidator  = body('email')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    .withMessage('email must be a valid');

export const userCreateValidator = [
    loginValidator,
    passwordValidator,
    emailValidator,
    inputCheckErrorsMiddleware
]
