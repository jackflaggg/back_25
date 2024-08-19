import {Response, Request} from "express"
import {BlogParamsModel, HTTP_STATUSES, RequestWithParamsAndQuery} from "../../models/common/common-types";
import {InQueryPostModel} from "../../models/post/input/input-type-posts";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {queryHelperToPost} from "../../utils/helpers/helper-query-get";
import {CommentsQueryRepository} from "../../repositories/comments/comments-query-repository";

export const getCommentsToPostId = async (req: Request/*RequestWithParamsAndQuery<BlogParamsModel, InQueryPostModel>*/, res: Response) => {

    const { postId } = req.params

    if(!validateId(postId)){
        console.log('рухнула валидация!')
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const existingPost = await postsQueryRepository.giveOneToIdPost(postId);

    if(!existingPost){
        console.log('нет поста!')
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const sortDataQuery = queryHelperToPost(req.query);

    const allComments = await CommentsQueryRepository.getAllCommentsToPostId(postId, sortDataQuery);
    if (!allComments){
        console.log('нет комментов!')
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(200).send(allComments);
    return

}