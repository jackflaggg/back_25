import {commentsCollection, usersCollection} from "../../db/db";

export const CommentsDbRepository = {
    async CreateComment(inputComment: any) {
        const comment = await commentsCollection.insertOne(inputComment);
        if (!comment || !comment.insertedId) {
            return null;
        }
        return comment.insertedId.toString();
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