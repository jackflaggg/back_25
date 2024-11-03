import {CommentDbType} from "../../models/db/db.models";
import {WithId} from "mongodb";

export const commentMapper = (user: WithId<Omit<CommentDbType, 'postId'>>) => ({
        id: user._id.toString(),
        content: user.content,
        commentatorInfo: {
            userId: user.commentatorInfo.userId,
            userLogin: user.commentatorInfo.userLogin,
        },
        createdAt: user.createdAt,
})