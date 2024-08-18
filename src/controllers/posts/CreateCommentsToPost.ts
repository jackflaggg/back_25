import {Request, Response} from "express"
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {CommentsDbRepository} from "../../repositories/comments/comments-db-repository";
import {CommentsQueryRepository} from "../../repositories/comments/comments-query-repository";



export const createCommentByPostIdController = async (req: Request, res: Response) => {

    const userId = req.userId;
    const { content} = req.body;
    const { postId } = req.params;

    if (!userId || !content || !postId) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: 'User || content not valid'});
        return
    }
    const findUser = await usersQueryRepository.getUserById(userId.toString());
    if (!findUser) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: 'not user'});
        return
    }

    const findPost = await postsQueryRepository.giveOneToIdPost(postId);
    console.log(findPost)
    if (!findPost) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: 'not found post'});
        return
    }
    const newPost = {
        id: findPost.id,
        content: content,
        commentatorInfo: {
            id: findUser.id,
            login: findUser.login
        },
        createdAt: new Date().toISOString(),
    }

    const newComment = await CommentsDbRepository.CreateComment(newPost);

    if (!newComment) {
        res.status(403).send({error: 'error on create comment!'});
        return;
    }

    const findCreateComment = await CommentsQueryRepository.getComment(newComment);

    if (!findCreateComment) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: 'not found comment'});
        return
    }

    res.status(HTTP_STATUSES.OK_200).send(findCreateComment);
    return;
}