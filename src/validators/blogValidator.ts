import {body, ValidationChain} from "express-validator";

export const nameValidator = body('name')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({max: 15})
    .withMessage('more then 15');

export const descriptionValidator = body('description')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({max: 500})
    .withMessage('more then 500');

export const urlValidator = body('websiteUrl')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({max: 100})
    .withMessage('more then 100')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('websiteUrl must be a valid URL');

export const blogValidator: ValidationChain[] = [
    nameValidator,
    descriptionValidator,
    urlValidator
]