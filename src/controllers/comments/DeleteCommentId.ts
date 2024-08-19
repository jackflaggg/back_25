import { Request, Response } from "express";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {CommentsQueryRepository} from "../../repositories/comments/comments-query-repository";
import {commentService} from "../../domain/comment/comment-service";

export const deleteCommentController = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    const { userId } = req;
    if (!validateId(userId as string)){
        res.sendStatus(403)
        return
    }
    const deleteComment = await commentService.deleteComment(commentId)

    const user = await usersQueryRepository.getUserById(userId as string);

    if (!user){
        console.log('не найден пользователь!')
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const comment = await CommentsQueryRepository.getComment(commentId);
    if (!comment){
        console.log('не найден коммент!')
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
}