import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {HTTP_STATUSES} from "../../../types/types";
import {postsRepository} from "../../../repositories/posts-repository";

export const OnePostController = (req: Request, res:Response) => {
    const getPostId = postsRepository.giveOne(req.params.id);
    res.status(HTTP_STATUSES.OK_200).send(getPostId);
}