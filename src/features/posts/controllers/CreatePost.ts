import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {HTTP_STATUSES} from "../../../types/types";
import {postsRepository} from "../../../repositories/posts-repository";

export const createPostController = (req: Request, res:Response) => {
    const newPost = postsRepository.create(req.body);
    const findCreatePost = postsRepository.giveOne(newPost.id);
    res.status(HTTP_STATUSES.CREATED_201).send(findCreatePost);
}