import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParams} from "../../models/common-types";
import {ObjectId} from "mongodb";
import {postsService} from "../../domain/post/post-service";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";

export const deletePostController = async (req: RequestWithParams<PostParamsId>,
                                           res:Response) => {
    const { id: PostId } = req.params;
    if (!ObjectId.isValid(PostId)) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const post = await postsQueryRepository.giveOneToIdPost(PostId);

    if (!post) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    const delPost = await postsService.delPost(PostId);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}