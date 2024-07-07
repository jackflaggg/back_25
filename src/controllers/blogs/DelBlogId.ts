import {Response} from "express";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParams} from "../../models/common-types";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {ObjectId} from "mongodb";
import {blogsService} from "../../domain/blog/blog-service";

export const deleteBlogController = async (req: RequestWithParams<BlogParamsModel>,
                                           res:Response) => {
    const {id} = req.params;

    if (!ObjectId.isValid(id)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const blog = await blogsService.giveOneToIdBlog(id);
    if (!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    const deleteBlog = await blogsService.delBlog(id);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}