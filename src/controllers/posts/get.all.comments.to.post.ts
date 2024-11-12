import {HTTP_STATUSES} from "../../models/common/common.types";
import {validateId} from "../../utils/helpers/helper.validate.id";
import {postsQueryRepository} from "../../repositories/posts/posts.query.repository";
import {queryHelperToPost} from "../../utils/helpers/helper.query.get";
import {CommentsQueryRepository} from "../../repositories/comments/comments.query.repository";
import {
    BlogParamsToPostModel,
    RequestWithParamsAndQuery, ResponseBody
} from "../../models/common/req_res_params/request.response.params";
import {InQueryPostModel} from "../../models/post/input/input.type.posts";
import {OutGetAllCommentsModel} from "../../models/comments/output/output.type.comments";

export const getCommentsToPostId = async (req: RequestWithParamsAndQuery<BlogParamsToPostModel, InQueryPostModel>, res: ResponseBody<OutGetAllCommentsModel>) => {

    const { postId } = req.params

    if(!validateId(postId)){
        console.log(`[postId] рухнула валидация`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const existingPost = await postsQueryRepository.giveOneToIdPost(postId);
    if(!existingPost){
        console.log(`[existingPost] не найден пост в репозитории`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const sortDataQuery = queryHelperToPost(req.query);

    const allComments = await CommentsQueryRepository.getAllCommentsToPostId(postId, sortDataQuery);
    if (!allComments){
        console.log(`[allComments] выдал херню`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(HTTP_STATUSES.OK_200).send(allComments);
    return;

}