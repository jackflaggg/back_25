import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParams} from "../../../types/types";
import {postsRepository} from "../../../repositories/posts-repository";

export const deletePostController = (req: RequestWithParams<PostParamsId>, res:Response) => {
    postsRepository.del(req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}