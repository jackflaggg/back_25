import {body, param, ValidationChain} from "express-validator";
import {blogsQueryRepositories} from "../repositories/blogs/blogs.query.repository";

export const titleValidator =
    body('title')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пусто')
    .isLength({max: 30})
    .withMessage('больше 30 символов');

export const shortDescriptionValidator =
    body('shortDescription')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пусто')
    .isLength({max: 100})
    .withMessage('больше 100 символов');

export const contentValidator =
    body('content')
    .isString()
    .withMessage('это не строка')
    .trim()
    .notEmpty()
    .withMessage('пусто')
    .isLength({max: 1000})
    .withMessage('больше 1000 символов');

export const blogIdValidator =
    body('blogId')
    .isString()
    .withMessage('это не строка')
    .trim()
    .custom(async blogId => {
        const blog = await blogsQueryRepositories.giveOneToIdBlog(blogId);
        if (!blog) {
            throw Error('[blogId] некорректный');
        }
        return !!blog;
    })
    .withMessage('это не блог');

export const blogIdParamsValidator =
    param('id')
    .isString()
    .trim()
    .withMessage('это не строка')
    .isLength({max: 500})
    .withMessage('больше 500 символов');

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