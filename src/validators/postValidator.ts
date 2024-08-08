import {body, param, ValidationChain} from "express-validator";
import {blogsQueryRepositories} from "../repositories/blogs/blogs-query-repository";

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
        const blog = await blogsQueryRepositories.giveOneToIdBlog(blogId);
        if (!blog) {
            throw Error('Incorrect blogId')
        }
        return !!blog
    })
    .withMessage('no blog');

export const createCommentValidator = body('content')
    .isString()
    .withMessage('not string')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({min: 20, max: 300})
    .withMessage('more then 300 or min 20');

export const blogIdParamsValidator = param('id')
    .isString()
    .trim()
    .withMessage('this is not string')
    .isLength({max: 500})
    .withMessage('more then 500');

export const postValidator: ValidationChain[] = [
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator
]

export const postCreateWithBlogIdValidator: ValidationChain[] = [
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdParamsValidator
]