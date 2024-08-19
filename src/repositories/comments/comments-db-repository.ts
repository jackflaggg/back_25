import {commentsCollection, usersCollection} from "../../db/db";
import {ObjectId} from "mongodb";

export const CommentsDbRepository = {
    async CreateComment(inputComment: any) {
        const comment = await commentsCollection.insertOne(inputComment);
        if (!comment || !comment.insertedId) {
            return null;
        }
        return comment.insertedId.toString();
    },
    async UpdateComment(commentId: string, updateDataComment: string): Promise<string | null> {
        const updateComment = await commentsCollection.updateOne({_id: new ObjectId(commentId)}, {$set: { content: updateDataComment} })

        if (!updateComment || !updateComment.upsertedId) {
            return null;
        }
        return updateComment.upsertedId.toString();
    },
    async deleteComment(id: string): Promise<any> {
        const deleteComment = await commentsCollection.deleteOne({_id: new ObjectId(id)});
        console.log(deleteComment)
        return deleteComment.acknowledged;
    },
}