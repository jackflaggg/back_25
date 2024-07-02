import {Response} from "express";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParamsAndBody} from "../../models/common-types";
import {InputUpdateBlogModel} from "../../models/blog/input/update.blog.input.models";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {ObjectId} from "mongodb";

export const updateBlogController = async (req: RequestWithParamsAndBody<BlogParamsModel, InputUpdateBlogModel>,
                                           res:Response) => {
    const {id} = req.params;

    if (!ObjectId.isValid(id)) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const { name, description, websiteUrl} = req.body;

    const blog = await blogsRepositories.giveOneToIdBlog(id);
    console.log(blog)
    if (!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }
    const isBlogUpdated = await blogsRepositories.putBlog(id, {name, description, websiteUrl});
    if (!isBlogUpdated) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}