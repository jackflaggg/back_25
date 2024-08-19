import {Request, Response} from "express";
import {commentService} from "../../domain/comment/comment-service";
import {HTTP_STATUSES, ResultStatus, ResultStatusType} from "../../models/common/common-types";

export const deleteCommentController = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    const { userId } = req;

    const deleteComment = await commentService.deleteComment(commentId, userId as string)

    const statusMap: Record<ResultStatusType, HTTP_STATUSES> = {
        [ResultStatus.BadRequest]: HTTP_STATUSES.BAD_REQUEST_400,
        [ResultStatus.NotFound]: HTTP_STATUSES.NOT_FOUND_404,
        [ResultStatus.Forbidden]: HTTP_STATUSES.NOT_FORBIDDEN_403,
        [ResultStatus.NotContent]: HTTP_STATUSES.NO_CONTENT_204,
    };

    const statusCode = statusMap[deleteComment.status];

    if (statusCode && deleteComment.extensions) {
        res.status(statusCode).send({ errorsMessages: deleteComment.extensions });
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return
}