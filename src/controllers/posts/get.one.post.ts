import {HTTP_STATUSES} from "../../models/common/common.types";
import {postsQueryRepository} from "../../repositories/posts/posts.query.repository";
import {validateId} from "../../utils/helpers/helper.validate.id";
import {OutPostModel} from "../../models/post/output/output.type.posts";
import {
    PostParamsId,
    RequestWithParams,
    ResponseBody
} from "../../models/common/req_res_params/request.response.params";

export const OnePostController = async (req: RequestWithParams<PostParamsId>,
                                        res:ResponseBody<OutPostModel>) => {
    const { id: postId } = req.params;

    if (!validateId(postId)) {
        console.log(`[postId] не валиден`);
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const getPostId = await postsQueryRepository.giveOneToIdPost(postId);

    if (!getPostId) {
        console.log(`[getPostId] не был найден в репозитории`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(HTTP_STATUSES.OK_200).send(getPostId);
    return;
}