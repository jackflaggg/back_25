import {body, ValidationChain} from "express-validator";

export const loginValidator  = body('login')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .isLength({min: 3, max: 10})
    .withMessage('больше 10 символов или меньше 3 символов')
    .matches(/^[a-zA-Z0-9_-]*$/)
    .withMessage('логин не прошел валидацию');

export const passwordValidator  = body('password')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .isLength({min: 6, max: 20})
    .withMessage('больше 20 символов или меньше 6 символов');

export const emailValidator  = body('email')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage('email не прошел валидацию: example@example.com');

export const userCreateValidator: ValidationChain[] = [
    loginValidator,
    passwordValidator,
    emailValidator
];