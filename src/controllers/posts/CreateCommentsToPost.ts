import {Request, Response} from "express"
import {HTTP_STATUSES} from "../../models/common/common-types";
import {CommentsQueryRepository} from "../../repositories/comments/comments-query-repository";
import {postsService} from "../../domain/post/post-service";
import {ErrorsMessageType, ResultStatus} from "../../models/common/errors/errors-type";
import {ResponseBody} from "../../models/common/req_res_params/request-response-params";
import {OutCommentModel} from "../../models/comments/output/output-type-comments";

export const createCommentByPostIdController = async (req: Request, res: ResponseBody<OutCommentModel | ErrorsMessageType>) => {
    const createComment = await postsService.createCommentToPost(req.params.postId, req.body.content, req.userId as string)

    if (createComment.status === ResultStatus.NotFound){
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({errorsMessages: createComment.extensions});
        return
    }

    const findCreateComment = await CommentsQueryRepository.getComment(createComment.data as string);

    if (!findCreateComment) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({errorsMessages: [{message: 'not found comment', field: 'comment'}]});
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(findCreateComment);
    return;
}