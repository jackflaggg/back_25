import {Response} from "express";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParamsAndBody} from "../../models/common/common-types";
import {InputUpdateBlogModel} from "../../models/blog/input/update.blog.input.models";
import {blogsService} from "../../domain/blog/blog-service";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {validateId} from "../../utils/helpers/helper-validate-id";

export const updateBlogController = async (req: RequestWithParamsAndBody<BlogParamsModel, InputUpdateBlogModel>,
                                           res:Response) => {
    const {id} = req.params;
    if (!validateId(id)) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const blog = await blogsQueryRepositories.giveOneToIdBlog(id);
    if (!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    const isBlogUpdated = await blogsService.putBlog(id, req.body as InputUpdateBlogModel);
    if (!isBlogUpdated) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}