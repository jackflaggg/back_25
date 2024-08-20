import {CommentDbType} from "../../models/db/db.models";

export const commentMapper = (user: any /*Omit<CommentDbType, 'postId'>*/) => {
    return {
        id: user._id.toString(),
        content: user.content,
        commentatorInfo: {
            userId: user.commentatorInfo.id,
            userLogin: user.commentatorInfo.login
        },
        createdAt: new Date().toISOString(),
    }
}