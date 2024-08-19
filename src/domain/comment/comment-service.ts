import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {CommentsQueryRepository} from "../../repositories/comments/comments-query-repository";

export const commentService = {
    async getComment(commentId: string) {

    },
    async updateComment(commentId: string){

    },
    async deleteComment(commentId: string, userId: string){
        const user = await usersQueryRepository.getUserById(userId);

        if(!user){
            return {

            }
        }
        const comment = await CommentsQueryRepository.getComment(commentId);

    },
}