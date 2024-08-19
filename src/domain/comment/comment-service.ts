import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {CommentsQueryRepository} from "../../repositories/comments/comments-query-repository";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {ResultStatus} from "../../models/common/common-types";
import {CommentsDbRepository} from "../../repositories/comments/comments-db-repository";

export const commentService = {
    async getComment(commentId: string) {

    },
    async updateComment(commentId: string){

    },
    async deleteComment(commentId: string, userId: string){

        if (!validateId(commentId)){
            return {
                status: ResultStatus.BadRequest,
                extensions: [{field: 'commentId', message: 'The comment is invalid'}],
                data: null
            }
        }

        const comment = await CommentsQueryRepository.getComment(commentId);
        if (!comment) {
            return {
                status: ResultStatus.NotFound,
                extensions: [{field: 'comment', message: 'The comment not found'}],
                data: null
            }
        }

        if (comment.commentatorInfo.userId !== userId){
            return {
                status: ResultStatus.Forbidden,
                extensions: [{field: 'comment', message: 'The comment not user'}],
                data: null
            }
        }

        const deleteComment = await CommentsDbRepository.deleteComment(comment.id);
        return {
            status: ResultStatus.NotContent,
            data: deleteComment
        }
    },
}