import {Request, Response} from "express"
import {HTTP_STATUSES, ResultStatus} from "../../models/common/common-types";
import {CommentsQueryRepository} from "../../repositories/comments/comments-query-repository";
import {postsService} from "../../domain/post/post-service";

export const createCommentByPostIdController = async (req: Request, res: Response) => {
    const createComment = await postsService.createCommentToPost(req.params.postId, req.body.content, req.userId as string, )

    if (createComment.status === ResultStatus.NotFound){
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: createComment.extensions});
        return
    }

    const findCreateComment = await CommentsQueryRepository.getComment(createComment.data as string);

    if (!findCreateComment) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: 'not found comment'});
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(findCreateComment);
    return;
}