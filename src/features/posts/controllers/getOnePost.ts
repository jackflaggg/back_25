import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParams} from "../../../types/types";
import {postsRepository} from "../../../repositories/posts-repository";

export const OnePostController = (req: RequestWithParams<PostParamsId>, res:Response) => {
    const getPostId = postsRepository.giveOneAndMap(req.params.id);
    res.status(HTTP_STATUSES.OK_200).send(getPostId);
}