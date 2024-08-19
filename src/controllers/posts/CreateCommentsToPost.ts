import {Request, Response} from "express"
import {HTTP_STATUSES, ResultStatus, ResultStatusType} from "../../models/common/common-types";
import {CommentsQueryRepository} from "../../repositories/comments/comments-query-repository";
import {postsService} from "../../domain/post/post-service";



export const createCommentByPostIdController = async (req: Request, res: Response) => {
    // ПЕРЕДЕЛАТЬ НА СЕРВИС!
    const createComment = await postsService.createCommentToPost(req.params.postId, req.userId as string, req.body.content)

    const statusMap: Record<ResultStatusType, HTTP_STATUSES> = {
        [ResultStatus.BadRequest]: HTTP_STATUSES.BAD_REQUEST_400,
        [ResultStatus.NotFound]: HTTP_STATUSES.NOT_FOUND_404,
        [ResultStatus.Forbidden]: HTTP_STATUSES.NOT_FORBIDDEN_403,
        [ResultStatus.NotContent]: HTTP_STATUSES.NO_CONTENT_204,
    };

    const statusCode = statusMap[createComment.status];

    if (statusCode && createComment.extensions) {
        console.log('вошел в плохой статус! ' + statusCode)
        res.status(statusCode).send({ errorsMessages: createComment.extensions });
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