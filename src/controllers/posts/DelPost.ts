import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParams} from "../../models/common-types";
import {postsRepository} from "../../repositories/posts-db-repository";
import {ObjectId} from "mongodb";

export const deletePostController = async (req: RequestWithParams<PostParamsId>,
                                           res:Response) => {
    const { id: PostId } = req.params;
    if (!ObjectId.isValid(PostId)) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const post = await postsRepository.giveOneToIdPost(PostId);

    if (!post) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    await postsRepository.delPost(PostId);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}