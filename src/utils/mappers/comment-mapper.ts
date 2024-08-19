
export const commentMapper = (user: any) => {
    return {
        id: user._id.toString(),
        content: user.content,
        commentatorInfo: {
            userId: user._id.toString(),
            userLogin: user.login.toString()
        },
        createdAt: new Date().toISOString(),
    }
}