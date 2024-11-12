import {CommentDbType} from "../../models/db/db.models";
import {postsRepository} from "../../repositories/posts/posts.db.repository";
import {InCreatePostModel, InUpdatePostModel} from "../../models/post/input/input.type.posts";
import {usersQueryRepository} from "../../repositories/users/users.query.repository";
import {postsQueryRepository} from "../../repositories/posts/posts.query.repository";
import {CommentsDbRepository} from "../../repositories/comments/comments.db.repository";
import {ResultStatus} from "../../models/common/errors/errors.type";

export const postsService = {
    async createPost(post: Omit<InCreatePostModel, 'createdAt'>, blogName: string): Promise<string | null> {
        const { title, shortDescription, content, blogId} = post;

        const newPost: InCreatePostModel = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: blogName,
            createdAt: new Date().toISOString()
        }

        return await postsRepository.createPost(newPost);
    },

    async putPost(post: Omit<InUpdatePostModel, 'blogName'>, blogName: string, postId: string): Promise<boolean> {
        const { title, shortDescription, content, blogId} = post;

        const upPost: InUpdatePostModel = {
            title, shortDescription, content, blogId, blogName: blogName
        }
        return await postsRepository.putPost(upPost, postId)
    },

    async delPost(id: string): Promise<boolean> {
        return await postsRepository.delPost(id);
    },

    async createCommentToPost(postId: string, inputData: string, userId: string) {

        const findUser = await usersQueryRepository.getUserById(userId);

        if (!findUser) {
            return {
                status: ResultStatus.NotFound,
                extensions: {message: 'пользователь не был найден', field: 'user'},
                data: null
            }
        }

        const findPost = await postsQueryRepository.giveOneToIdPost(postId);

        if (!findPost) {
            return {
                status: ResultStatus.NotFound,
                extensions: {message: 'пост не был найден', field: 'post'},
                data: null
            }
        }

        const createComment: CommentDbType = {
            content: inputData,
            commentatorInfo: {
                userId: findUser.id,
                userLogin: findUser.login
            },
            postId: findPost.id,
            createdAt: new Date().toISOString(),
        }

        const newComment = await CommentsDbRepository.CreateComment(createComment);

        return {
            status: ResultStatus.NotContent,
            data: newComment
        }
    }
}