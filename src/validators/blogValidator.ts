import {body, param} from "express-validator";
import {inputCheckErrorsMiddleware} from "../utils/middlewares/checkErrorsValidator";
import {ObjectId} from "mongodb";
import {blogsCollections} from "../db/db";

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

export const blogIdParamsValidator = param('id')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('is empty')
    .isLength({max: 100})
    .withMessage('not found id')
    .custom( async blogId => {

        if (!ObjectId.isValid(blogId)) {
            throw Error('Incorrect blogId')
        }

        const blog = await blogsCollections.findOne(blogId);

        if (!blog?._id) {
            throw Error('not found blogId')
        }
        return !!blog;
    })
    .withMessage('blog not found')

export const blogValidator = [
    nameValidator,
    descriptionValidator,
    urlValidator,
    inputCheckErrorsMiddleware
]