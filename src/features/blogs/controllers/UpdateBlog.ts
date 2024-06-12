import {Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-in-memory-repository";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParamsAndBody} from "../../../types/types";
import {BlogInputModel} from "../../../input-output-types/blogs-types";

export const updateBlogController = (req: RequestWithParamsAndBody<BlogParamsModel, BlogInputModel>, res:Response) => {
    const bodyBlog: BlogInputModel = req.body;
    const {id} = req.params;
    blogsRepositories.put(bodyBlog, id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}