import {Response} from "express";
import {HTTP_STATUSES, RequestWithBody} from "../../../types/types";
import {postsInMemoryRepository} from "../../../repositories/posts-in-memory-repository";
import {PostInputModel} from "../../../input-output-types/posts-types";

export const createPostController = (req: RequestWithBody<PostInputModel>, res:Response) => {
    const newPost = postsInMemoryRepository.create(req.body);
    const findCreatePost = postsInMemoryRepository.giveOne(newPost);
    res.status(HTTP_STATUSES.CREATED_201).send(findCreatePost);
}