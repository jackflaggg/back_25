import {Response} from "express";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParams} from "../../models/common-types";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {ObjectId} from "mongodb";

export const deleteBlogController = async (req: RequestWithParams<BlogParamsModel>,
                                           res:Response) => {
    const {id} = req.params
    const deleteBlog = await blogsRepositories.delBlog(new ObjectId(id));

    if (!deleteBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}