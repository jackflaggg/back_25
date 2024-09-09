import {createString} from "../../helpers-e2e/datatests";
import {ObjectId} from "mongodb";

export const inCreateUser = () => ({
    commentId: new ObjectId().toString(),
    id: new ObjectId().toString(),
    inputComment: createString(11)
})

export const upComment = (userId: string) => ({
        id: new ObjectId().toString(),
        content: createString(11),
        commentatorInfo: {
            userId: userId,
            userLogin: createString(11) + ' login',
        },
        createdAt: new Date().toISOString(),
})