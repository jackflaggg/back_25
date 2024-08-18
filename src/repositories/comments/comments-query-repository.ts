import {commentsCollection} from "../../db/db";
import {ObjectId} from "mongodb";

export const CommentsQueryRepository = {
    async getComment(idComment: string) {
        const comment = await commentsCollection.findOne({ _id: new ObjectId(idComment)});

        if (!comment) {
            return null;
        }
        return comment;
    },
    // async UpdateComment(findComment: any, updateDataComment: any): Promise<string | null> {
    //     const updateComment = await commentsCollection.updateOne(findComment, {$set: updateDataComment})
    //
    //     if (!updateComment || !updateComment.insertedId) {
    //         return null;
    //     }
    //     return updateComment.insertedId.toString();
    // },
    // async deleteComment(id: string): Promise<any> {
    //     const deleteComment = await usersCollection.deleteOne({_id: new ObjectId(id)});
    //     return deleteComment.acknowledged;
    // },
}