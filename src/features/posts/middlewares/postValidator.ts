import {postsRepository} from "../../../repositories/posts-repository";
import {Response, NextFunction} from "express";
import {body} from "express-validator";
import {HTTP_STATUSES, PostParamsId, RequestWithParams} from "../../../types/types";
import {adminMiddlewares} from "../../global-middlewares/admin-middleware";
import {inputCheckErrorsMiddleware} from "../../global-middlewares/checkErrorsValidator";
import {blogsRepositories} from "../../../repositories/blogs-repository";


export const titleValidator = body('title').isString().withMessage('this is not string')
    .trim().notEmpty().withMessage('empty').isLength({max: 30}).withMessage('more then 30');
export const shortDescriptionValidator = body('shortDescription').isString().withMessage('this is not string')
    .trim().notEmpty().withMessage('empty').isLength({max: 100}).withMessage('more then 100');
export const contentValidator = body('content').isString().withMessage('this is not string')
    .trim().notEmpty().withMessage('empty').isLength({max: 1000}).withMessage('more then 1000');
// export const blogIdValidator = body('blogId').isString().withMessage('this is not string')
//     .trim().notEmpty().withMessage('empty');

export const blogIdValidator = body('blogId').isString().withMessage('not string')
    .trim().custom(blogId => {
        const blog = blogsRepositories.getOne(blogId)
        return !!blog
    }).withMessage('no blog')


export const findPostValidator = (req: RequestWithParams<PostParamsId>, res: Response, next: NextFunction) => {
    const post = postsRepository.giveOne(req.params.id);
    if (!post) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    next()
}

export const postValidator = [
    adminMiddlewares,
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,
    inputCheckErrorsMiddleware
]