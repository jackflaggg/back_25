import {PostCreateType} from "../../models/db/db.models";
import {InputUpdatePostModel} from "../../models/post/input/update.post.input.models";
import {postsRepository} from "../../repositories/posts-db-repository";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";

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
    async putPost(post: InputUpdatePostModel, id: string): Promise<boolean> {
        return await postsRepository.putPost(post, id)
    },
    async delPost(id: string): Promise<boolean> {
        return await postsRepository.delPost(id);
    }
}