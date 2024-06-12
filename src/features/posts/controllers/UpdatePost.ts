import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParamsAndBody} from "../../../types/types";
import {postsInMemoryRepository} from "../../../repositories/posts-in-memory-repository";
import {PostInputModel} from "../../../input-output-types/posts-types";

export const updatePostController = (req: RequestWithParamsAndBody<PostParamsId, PostInputModel>, res:Response) => {
    postsInMemoryRepository.put(req.body, req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}