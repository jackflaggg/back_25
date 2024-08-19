import {Request, Response} from "express";
import {commentService} from "../../domain/comment/comment-service";
import {HTTP_STATUSES, ResultStatus} from "../../models/common/common-types";

export const deleteCommentController = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    const { userId } = req;

    const deleteComment = await commentService.deleteComment(commentId, userId as string)

    if (deleteComment.status === ResultStatus.BadRequest) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send({errorsMessages: deleteComment.extensions || []})
        return
    }

    if (deleteComment.status === ResultStatus.NotFound) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .send({errorsMessages: deleteComment.extensions || []})
        return
    }

    if (deleteComment.status === ResultStatus.Forbidden) {
        res
            .status(HTTP_STATUSES.NOT_FORBIDDEN)
            .send({errorsMessages: deleteComment.extensions || []})
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    return;
}