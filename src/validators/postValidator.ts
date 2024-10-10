import {body, param, ValidationChain} from "express-validator";
import {blogsQueryRepositories} from "../repositories/blogs/blogs-query-repository";

export const titleValidator =
    body('title')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пусто')
    .isLength({max: 30})
    .withMessage('more then 30');

export const shortDescriptionValidator =
    body('shortDescription')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({max: 100})
    .withMessage('more then 100');

export const contentValidator =
    body('content')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('empty')
    .isLength({max: 1000})
    .withMessage('more then 1000');

export const blogIdValidator =
    body('blogId')
    .isString()
    .withMessage('это не строка')
    .trim()
    .custom(async blogId => {
        const blog = await blogsQueryRepositories.giveOneToIdBlog(blogId);
        if (!blog) {
            throw Error('Incorrect blogId');
        }
        return !!blog;
    })
    .withMessage('no blog');

export const blogIdParamsValidator =
    param('id')
    .isString()
    .trim()
    .withMessage('это не строка')
    .isLength({max: 500})
    .withMessage('more then 500');

export const postValidator: ValidationChain[] = [
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator
];

export const postCreateWithBlogIdValidator: ValidationChain[] = [
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdParamsValidator
];