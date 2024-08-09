import {body, ValidationChain} from "express-validator";

export const passwordValidator  = body('password')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({min: 6, max: 20})
    .withMessage('password length should be from 6 to 20 symbols');

export const loginOrEmailValidator = body('loginOrEmail')
    .optional({ nullable: true })
    .custom((value, { req }) => {
        if (!value) {
            throw new Error('loginOrEmail должны быть указаны!');
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(value)) {
            // Ввод email, применяем проверки для email
            return body('loginOrEmail')
                .isString()
                .withMessage('this is not a string')
                .trim()
                .notEmpty()
                .withMessage('empty')
                .matches(emailRegex)
                .withMessage('email should follow the pattern: example@example.com')
                .run(req);
        } else {
            // Ввод логина, применяем проверки для логина
            return body('loginOrEmail')
                .isString()
                .withMessage('this is not a string')
                .trim()
                .notEmpty()
                .withMessage('empty')
                .isLength({ min: 3, max: 10 })
                .withMessage('length login should be between 3 and 10 characters')
                .matches(/^[a-zA-Z0-9_-]*$/)
                .withMessage('login can only contain alphanumeric characters, underscores, and dashes')
                .run(req);
        }
    });

export const loginPostValidator: ValidationChain[] = [
    loginOrEmailValidator,
    passwordValidator,
]
