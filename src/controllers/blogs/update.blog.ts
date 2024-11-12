import {Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common.types";
import {blogsService} from "../../domain/blog/blog.service";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs.query.repository";
import {validateId} from "../../utils/helpers/helper.validate.id";
import {InUpdateBlogModel} from "../../models/blog/input/input.type.blogs";
import {BlogParamsModel, RequestWithParamsAndBody} from "../../models/common/req_res_params/request.response.params";

export const updateBlogController = async (req: RequestWithParamsAndBody<BlogParamsModel, InUpdateBlogModel>,
                                           res:Response) => {
    const {id} = req.params;

    if (!validateId(id)) {
        console.log(`[id] блога не валиден`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const blog = await blogsQueryRepositories.giveOneToIdBlog(id);
    if (!blog) {
        console.log(`[blog] не в репозитории не найден`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    const isBlogUpdated = await blogsService.putBlog(id, req.body);
    if (!isBlogUpdated) {
        console.log(`[isBlogUpdated] не получилось обновить`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}