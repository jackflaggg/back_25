import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {InputUpdateBlogModel} from "../../models/blog/input/update.blog.input.models";
import {InputCreateBlogModel} from "../../models/blog/input/create.blog.input.models";

export const blogsService = {
    async createBlog(blog: InputCreateBlogModel): Promise<string | null>{
        const { name, description, websiteUrl } = blog;

        const newBlog = {
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }

        return await blogsRepositories.createBlog(newBlog);
    },
    async createPostToBlogInputModel(blog: any, post: any): Promise<string | null> {
        const { title, shortDescription, content } = post;
        const newPost = {
            title,
            shortDescription,
            content,
            blogId: blog.id,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }

        return await blogsRepositories.createPostToBlogID(blog!.id, newPost);
    },
    async putBlog(id: string, blog: InputUpdateBlogModel): Promise<boolean> {

        return await blogsRepositories.putBlog(id, blog);
    },
    async delBlog(id: string): Promise<boolean> {
        return await blogsRepositories.delBlog(id)
    }
}
