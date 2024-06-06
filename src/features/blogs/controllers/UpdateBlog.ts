import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {HTTP_STATUSES} from "../../../types/types";

export const updateBlogController = (req: Request, res:Response) => {
    blogsRepositories.put(req.body, req.params.id);
    res.sendStatus(HTTP_STATUSES.CREATED_201)
}