import {body, ValidationChain} from "express-validator";

export const nameValidator =
    body('name')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .isLength({max: 15})
    .withMessage('больше 15 символов');

export const descriptionValidator =
    body('description')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .isLength({max: 500})
    .withMessage('больше 500 символов');

export const urlValidator =
    body('websiteUrl')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пустота')
    .isLength({max: 100})
    .withMessage('больше 100 символов')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('[websiteUrl] не валиден');

export const blogValidator: ValidationChain[] = [
    nameValidator,
    descriptionValidator,
    urlValidator
];