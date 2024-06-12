import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-in-memory-repository";
import {HTTP_STATUSES} from "../../../types/types";

export const AllBlogController = (req: Request, res:Response) => {
    const getAllBlogs = blogsRepositories.getAll();
    res.status(HTTP_STATUSES.OK_200).send(getAllBlogs);
}