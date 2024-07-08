import {body} from "express-validator";
import {inputCheckErrorsMiddleware} from "../middlewares/checkErrorsValidator";
import {blogsRepositories} from "../repositories/blogs-db-repository";

export const titleValidator = body('title')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({max: 30})
    .withMessage('more then 30');
export const shortDescriptionValidator = body('shortDescription')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({max: 100})
    .withMessage('more then 100');
export const contentValidator = body('content')
    .isString()
    .withMessage('this is not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({max: 1000})
    .withMessage('more then 1000');

export const blogIdValidator = body('blogId')
    .isString()
    .withMessage('not string')
    .trim()
    .custom(async blogId => {
        const blog = await blogsRepositories.giveOneToIdBlog(blogId);
        if (!blog) {
            throw Error('Incorrect blogId')
        }
        return !!blog
    })
    .withMessage('no blog')


export const postValidator = [
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,
    inputCheckErrorsMiddleware
]