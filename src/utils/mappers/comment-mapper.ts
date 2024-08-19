
export const commentMapper = (user: any) => {
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