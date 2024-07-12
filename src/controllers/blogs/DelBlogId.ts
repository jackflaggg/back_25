import {Response} from "express";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParams} from "../../models/common-types";
import {ObjectId} from "mongodb";
import {blogsService} from "../../domain/blog/blog-service";
import {blogsQueryRepositories} from "../../repositories/blogs-query-repository";

export const deleteBlogController = async (req: RequestWithParams<BlogParamsModel>,
                                           res:Response) => {
    const {id} = req.params;

    if (!ObjectId.isValid(id)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const blog = await blogsQueryRepositories.giveOneToIdBlog(id)

    if (!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    const deleteBlog = await blogsService.delBlog(id);
    // мб избыточно, хз?
    if (!deleteBlog){
        console.log(`not delete ${blog}`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}