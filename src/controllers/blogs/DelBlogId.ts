import {Response} from "express";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParams} from "../../models/common-types";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {ObjectId} from "mongodb";

export const deleteBlogController = async (req: RequestWithParams<BlogParamsModel>,
                                           res:Response) => {
    const {id} = req.params;

    if (!ObjectId.isValid(id)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const blog = await blogsRepositories.giveOneToIdBlog(id);
    if (!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    const deleteBlog = await blogsRepositories.delBlog(id);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}