import {Request, Response} from "express"
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";


export const createCommentByPostIdController = async (req: Request, res: Response) => {

    const userId = req.userId;
    const { content} = req.body;
    const { postId } = req.params;

    if (!userId || !content || !postId) {
        res.status(400).send({error: 'User || content not valid'});
        return
    }
    const findUser = await usersQueryRepository.getUserById(userId.toString());
    if (!findUser) {
        res.status(400).send({error: 'not user'});
        return
    }

    const findPost = await postsQueryRepository.giveOneToIdPost(postId);
    console.log(findPost)
    if (!findPost) {
        res.status(404).send({error: 'not found post'});
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
    res.status(200).send(newPost);
    return;
}