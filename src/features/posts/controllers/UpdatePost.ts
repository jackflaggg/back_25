import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {HTTP_STATUSES} from "../../../types/types";
import {postsRepository} from "../../../repositories/posts-repository";

export const updatePostController = (req: Request, res:Response) => {
    postsRepository.put(req.body, req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}