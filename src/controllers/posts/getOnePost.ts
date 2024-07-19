import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParams} from "../../models/common-types";
import {ObjectId} from "mongodb";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";

export const OnePostController = async (req: RequestWithParams<PostParamsId>,
                                        res:Response) => {
    const { id: postId } = req.params;

    if (!ObjectId.isValid(postId)) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const getPostId = await postsQueryRepository.giveOneToIdPost(postId);

    if (!getPostId) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(HTTP_STATUSES.OK_200).send(getPostId);
}