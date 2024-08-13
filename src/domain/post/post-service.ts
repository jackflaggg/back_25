import {PostCreateType, PostUpdateType} from "../../models/db/db.models";
import {postsRepository} from "../../repositories/posts/posts-db-repository";
import {OutputBlogModel} from "../../models/blog/output/output-type-blogs";
import {InUpdatePostModel} from "../../models/post/input/input-type-posts";

export const postsService = {
    async createPost(post: PostCreateType, blog: OutputBlogModel): Promise<string | null> {
        const { title, shortDescription, content, blogId} = post;

        const newPost: PostCreateType = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }
        return await postsRepository.createPost(newPost);
    },
    async putPost(post: InUpdatePostModel, blog: OutputBlogModel, id: string): Promise<boolean> {
        const { title, shortDescription, content, blogId} = post;

        const upPost: PostUpdateType = {
            title, shortDescription, content, blogId, blogName: blog!.name
        }
        return await postsRepository.putPost(upPost, id)
    },
    async delPost(id: string): Promise<boolean> {
        return await postsRepository.delPost(id);
    }
}