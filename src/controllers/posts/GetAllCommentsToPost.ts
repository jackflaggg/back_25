import {Response} from "express"
import {BlogParamsModel, HTTP_STATUSES, RequestWithParamsAndQuery} from "../../models/common/common-types";
import {InQueryPostModel} from "../../models/post/input/input-type-posts";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {queryHelperToPost} from "../../utils/helpers/helper-query-get";
import {CommentsQueryRepository} from "../../repositories/comments/comments-query-repository";

export const getCommentsToPostId = async (req: RequestWithParamsAndQuery<BlogParamsModel, InQueryPostModel>, res: Response) => {
    const postId = req.params.id

    if(!validateId(postId)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const existingPost = await postsQueryRepository.giveOneToIdPost(postId);

    if(!existingPost){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const sortDataQuery = queryHelperToPost(req.query);
    const allComments = await CommentsQueryRepository.getAllCommentsToPostId(postId, sortDataQuery);
    if (!allComments){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(200).send(allComments);
    return

}