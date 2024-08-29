import {commentsCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {CommentDbType} from "../../models/db/db.models";

export const CommentsDbRepository = {
    async CreateComment(inputComment: CommentDbType) {

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
    async deleteComment(id: string): Promise<boolean> {
        const deleteComment = await commentsCollection.deleteOne({_id: new ObjectId(id)});

        return deleteComment.acknowledged;
    },
}