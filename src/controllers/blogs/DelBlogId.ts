import {Response} from "express";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParams} from "../../models/common/common-types";
import {blogsService} from "../../domain/blog/blog-service";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {validateId} from "../../utils/helpers/helper-validate-id";

export const deleteBlogController = async (req: RequestWithParams<BlogParamsModel>,
                                           res:Response) => {
    const {id} = req.params;

    if (!validateId(id)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const blog = await blogsQueryRepositories.giveOneToIdBlog(id)
    if (!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const deleteBlog = await blogsService.delBlog(id);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}