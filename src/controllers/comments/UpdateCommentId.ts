import { Response } from "express";
import {commentService} from "../../domain/comment/comment.service";
import {HTTP_STATUSES} from "../../models/common/common.types";
import {ResultStatus, ResultStatusType} from "../../models/common/errors/errors.type";
import {
    CommentParamsId,
    RequestWithParamsAndBody
} from "../../models/common/req_res_params/request.response.params";
import {errorsMessages} from "../../utils/features/errors.messages";

export const updateCommentController = async (req: RequestWithParamsAndBody<CommentParamsId, {content: string}>, res: Response) => {
    const { commentId } = req.params;

    const { userId } = req;

    const {content} = req.body;

    const updateComment = await commentService.updateComment(commentId, userId as string, content)

    const statusMap: Record<ResultStatusType, HTTP_STATUSES> = {
        [ResultStatus.BadRequest]: HTTP_STATUSES.BAD_REQUEST_400,
        [ResultStatus.NotFound]: HTTP_STATUSES.NOT_FOUND_404,
        [ResultStatus.Forbidden]: HTTP_STATUSES.NOT_FORBIDDEN_403,
        [ResultStatus.NotContent]: HTTP_STATUSES.NO_CONTENT_204,
    };

    const statusCode = statusMap[updateComment.status];

    if (statusCode && updateComment.extensions) {
        console.log(`[updateComment] возникла ошибка в сервисе`);
        res.status(statusCode).send(errorsMessages(updateComment.extensions));
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return
}