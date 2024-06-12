import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParams} from "../../../types/types";
import {postsInMemoryRepository} from "../../../repositories/posts-in-memory-repository";

export const OnePostController = (req: RequestWithParams<PostParamsId>, res:Response) => {
    const getPostId = postsInMemoryRepository.giveOneAndMap(req.params.id);
    res.status(HTTP_STATUSES.OK_200).send(getPostId);
}