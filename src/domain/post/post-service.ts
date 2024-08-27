import {CommentDbType, PostUpdateType} from "../../models/db/db.models";
import {postsRepository} from "../../repositories/posts/posts-db-repository";
import {OutputBlogModel} from "../../models/blog/output/output-type-blogs";
import {InCreatePostModel, InUpdatePostModel} from "../../models/post/input/input-type-posts";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {ResultStatus} from "../../models/common/common-types";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {CommentsDbRepository} from "../../repositories/comments/comments-db-repository";

export const postsService = {
    async createPost(post: InCreatePostModel, blog: OutputBlogModel): Promise<string | null> {
        const { title, shortDescription, content, blogId} = post;

        const newPost: InCreatePostModel = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }
        return await postsRepository.createPost(newPost);
    },
    async putPost(post: Omit<InUpdatePostModel, 'blogName'>, blog: OutputBlogModel, id: string): Promise<boolean> {
        const { title, shortDescription, content, blogId} = post;

        const upPost: InUpdatePostModel = {
            title, shortDescription, content, blogId, blogName: blog!.name
        }
        return await postsRepository.putPost(upPost, id)
    },
    async delPost(id: string): Promise<boolean> {
        return await postsRepository.delPost(id);
    },
    async createCommentToPost(postId: string, inputData: string, userId: string) {

        const findUser = await usersQueryRepository.getUserById(userId);

        if (!findUser) {
            return {
                status: ResultStatus.NotFound,
                extensions: [{field: 'user', message: 'The user not found'}],
                data: null
            }
        }

        const findPost = await postsQueryRepository.giveOneToIdPost(postId);

        if (!findPost) {
            return {
                status: ResultStatus.NotFound,
                extensions: [{field: 'post', message: 'The post not found'}],
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