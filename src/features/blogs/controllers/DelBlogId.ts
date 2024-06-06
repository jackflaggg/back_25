import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {HTTP_STATUSES} from "../../../types/types";

export const deleteBlogController = (req: Request, res:Response) => {
    blogsRepositories.del(req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}