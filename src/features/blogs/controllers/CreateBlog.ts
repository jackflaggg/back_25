import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {HTTP_STATUSES} from "../../../types/types";

export const createBlogController = (req: Request, res:Response) => {
    const newBlog = blogsRepositories.create(req.body);
    const findCreateBlog = blogsRepositories.getOne(newBlog.id);
    res.status(HTTP_STATUSES.CREATED_201).send(findCreateBlog);
}