import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParams} from "../../../types/types";
import {postsInMemoryRepository} from "../../../repositories/posts-in-memory-repository";

export const deletePostController = (req: RequestWithParams<PostParamsId>, res:Response) => {
    postsInMemoryRepository.del(req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}