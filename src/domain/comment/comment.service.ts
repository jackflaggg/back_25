import {CommentsQueryRepository} from "../../repositories/comments/comments.query.repository";
import {validateId} from "../../utils/helpers/helper.validate.id";
import {CommentsDbRepository} from "../../repositories/comments/comments.db.repository";
import {ResultStatus} from "../../models/common/errors/errors.type";

export const commentService = {
    async updateComment(commentId: string, userId: string, inputComment: string){

        if (!validateId(commentId)){
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: `The comment to update is invalid`, field: `commentId`},
                data: null
            }
        }

        const comment = await CommentsQueryRepository.getComment(commentId);
        if (!comment) {
            return {
                status: ResultStatus.NotFound,
                extensions: {message: `The comment not found`, field: `comment`},
                data: null
            }
        }

        if (comment.commentatorInfo.userId !== userId){
            return {
                status: ResultStatus.Forbidden,
                extensions: {message: `The comment not user`, field: `comment`},
                data: null
            }
        }

        const updateComment = await CommentsDbRepository.UpdateComment(commentId, inputComment);
        return {
            status: ResultStatus.NotContent,
            data: updateComment
        }
    },
    async deleteComment(commentId: string, userId: string){

        if (!validateId(commentId)){
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: `The comment to delete is invalid`, field: `commentId`},
                data: null
            }
        }

        const comment = await CommentsQueryRepository.getComment(commentId);
        if (!comment) {
            return {
                status: ResultStatus.NotFound,
                extensions: {message: `The comment not found`, field: `comment`},
                data: null
            }
        }

        if (comment.commentatorInfo.userId !== userId){
            return {
                status: ResultStatus.Forbidden,
                extensions: {message: `The comment not user`, field: `comment`},
                data: null
            }
        }

        const deleteComment = await CommentsDbRepository.deleteComment(comment.id);

        return {
            status: ResultStatus.NotContent,
            data: deleteComment
        }
    }
}