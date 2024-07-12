import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {InputUpdateBlogModel} from "../../models/blog/input/update.blog.input.models";
import {InputCreateBlogModel} from "../../models/blog/input/create.blog.input.models";
import {postMapper} from "../../models/post/mapper/post-mapper";

export const blogsService = {
    async createBlog(blog: any): Promise<string | null>{
        const { title, shortDescription, content } = blog;

        const newPost = {
            title,
            shortDescription,
            content,
            blogId: blog.id,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }
        return await blogsRepositories.createBlog(newPost);
    },
    async putBlog(id: string, blog: InputUpdateBlogModel): Promise<boolean> {
        return await blogsRepositories.putBlog(id, blog);
    },
    async delBlog(id: string): Promise<boolean> {
        return await blogsRepositories.delBlog(id)
    }
}
