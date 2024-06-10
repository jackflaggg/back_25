import {body} from "express-validator";
import {Request, Response, NextFunction} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {HTTP_STATUSES} from "../../../types/types";
import {adminMiddlewares} from "../../global-middlewares/admin-middleware";
import {inputCheckErrorsMiddleware} from "../../global-middlewares/checkErrorsValidator";

export const nameValidator = body('name').isString().withMessage('this is not string')
    .trim().notEmpty().withMessage('empty').isLength({max: 15}).withMessage('more then 15');
export const descriptionValidator = body('description').isString().withMessage('this is not string')
    .trim().notEmpty().withMessage('empty').isLength({max: 500}).withMessage('more then 500');
export const urlValidator = body('websiteUrl').isString().withMessage('this is not string')
    .trim().notEmpty().withMessage('empty').isLength({max: 100}).withMessage('more then 100')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/).withMessage('websiteUrl must be a valid URL');

export const findBlogValidator = (req: Request, res: Response, next: NextFunction) => {
    const blog = blogsRepositories.getOne(req.params.id);
    if (!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    next()
}

export const blogValidator = [
    adminMiddlewares,
    nameValidator,
    descriptionValidator,
    urlValidator,
    inputCheckErrorsMiddleware
]