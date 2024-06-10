import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {HTTP_STATUSES} from "../../../types/types";
import {BlogInputModel, BlogViewModel} from "../../../input-output-types/blogs-types";

export const createBlogController = (req: Request<any, any, BlogInputModel>, res:Response<BlogViewModel>) => {
    const newBlog = blogsRepositories.create(req.body);
    const findCreateBlog = blogsRepositories.getOneAndMap(newBlog);
    res.status(HTTP_STATUSES.CREATED_201).send(findCreateBlog);
}