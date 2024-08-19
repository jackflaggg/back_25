import {Request, Response} from "express";
import {commentService} from "../../domain/comment/comment-service";
import {HTTP_STATUSES, ResultStatus} from "../../models/common/common-types";

export const deleteCommentController = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    const { userId } = req;

    const deleteComment = await commentService.deleteComment(commentId, userId as string)

    const statusMap = {
        [ResultStatus.BadRequest]: HTTP_STATUSES.BAD_REQUEST_400,
        [ResultStatus.NotFound]: HTTP_STATUSES.NOT_FOUND_404,
        [ResultStatus.Forbidden]: HTTP_STATUSES.NOT_FORBIDDEN,
    };

    const statusCode = statusMap[deleteComment.status];

    if (statusCode) {
        res.status(statusCode).send({ errorsMessages: deleteComment.extensions || [] });
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    return;
}