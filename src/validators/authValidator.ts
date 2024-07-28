import {body, ValidationChain} from "express-validator";

export const loginValidator  = body('login')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({min: 3, max: 10})
    .withMessage('more then 10 or min 3')
    .matches(/^[a-zA-Z0-9_-]*$/)
    .withMessage('login length should be from 3 to 10 symbols');

export const passwordValidator  = body('password')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({min: 6, max: 20})
    .withMessage('password length should be from 6 to 20 symbols');

export const emailValidator  = body('email')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage('email should follow the pattern: example@example.com');


export const authCreateValidator: ValidationChain[] = [
    loginValidator,
    passwordValidator,
    emailValidator
]