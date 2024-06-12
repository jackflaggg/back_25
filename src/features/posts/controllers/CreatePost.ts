import {Response} from "express";
import {HTTP_STATUSES, RequestWithBody} from "../../../types/types";
import {postsRepository} from "../../../repositories/posts-repository";
import {PostInputModel} from "../../../input-output-types/posts-types";

export const createPostController = (req: RequestWithBody<PostInputModel>, res:Response) => {
    const newPost = postsRepository.create(req.body);
    const findCreatePost = postsRepository.giveOne(newPost);
    res.status(HTTP_STATUSES.CREATED_201).send(findCreatePost);
}