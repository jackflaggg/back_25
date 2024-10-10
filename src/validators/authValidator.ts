import {body, ValidationChain} from "express-validator";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordValidator  = body('password')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .isLength({min: 6, max: 20})
    .withMessage('длина больше 20 символов или меньше 6 символов');

export const loginValidator  = body('login')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .isLength({min: 3, max: 10})
    .withMessage('длина больше 10 символов или меньше 3 символов');

export const emailValidator  = body('email')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .matches(emailRegex)
    .withMessage('email не прошел валидацию: example@example.com')

export const loginOrEmailValidator = body('loginOrEmail')
    .optional({ nullable: true })
    .custom((value, { req }) => {
        if (!value) {
            throw new Error('loginOrEmail должны быть указаны!');
        }

        if (emailRegex.test(value)) {
            // Ввод email, применяем проверки для email
            return body('loginOrEmail')
                .isString()
                .withMessage('это не строка')
                .trim()
                .notEmpty()
                .withMessage('пустота')
                .matches(emailRegex)
                .withMessage('email не прошел валидацию: example@example.com')
                .run(req);
        } else {
            // Ввод логина, применяем проверки для логина
            return body('loginOrEmail')
                .isString()
                .withMessage('это не строка')
                .trim()
                .notEmpty()
                .withMessage('пустота')
                .isLength({ min: 3, max: 10 })
                .withMessage('длина больше 10 символов или меньше 3 символов')
                .matches(/^[a-zA-Z0-9_-]*$/)
                .withMessage('логин не прошел валидацию')
                .run(req);
        }
    });

export const codeValidator  = body('code')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .isLength({min: 6, max: 50})
    .withMessage('длина больше 50 символов или меньше 6 символов');

export const loginPostValidator: ValidationChain[] = [
    loginOrEmailValidator,
    passwordValidator,
]

export const registrationPostValidator: ValidationChain[] = [
    loginValidator,
    passwordValidator,
    emailValidator
]