import {Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {postsService} from "../../domain/post/post-service";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {PostParamsId, RequestWithParams} from "../../models/common/req_res_params/request-response-params";

export const deletePostController = async (req: RequestWithParams<PostParamsId>,
                                           res:Response) => {
    const { id: PostId } = req.params;
    if (!validateId(PostId)) {
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
    return;
}