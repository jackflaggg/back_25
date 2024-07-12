import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {InputUpdateBlogModel} from "../../models/blog/input/update.blog.input.models";
import {InputCreateBlogModel} from "../../models/blog/input/create.blog.input.models";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {CreatePostToBlogInputModel} from "../../models/blog/input/create.post.to.blog.input";

export const blogsService = {
    async createBlog(blog: InputCreateBlogModel | CreatePostToBlogInputModel): Promise<string | null>{
        const { title, shortDescription, content } = blog;

        const newBlog: OutputBlogModel = {
            title,
            shortDescription,
            content,
            blogId: blog.id,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }
        return await blogsRepositories.createBlog(newBlog);
    },
    async createPostToBlogInputModel(id: any, post: any): Promise<InputCreateBlogModel> {
        return await blogsRepositories.createPostToBlogID(id, post);
    },
    async putBlog(id: string, blog: InputUpdateBlogModel): Promise<boolean> {
        return await blogsRepositories.putBlog(id, blog);
    },
    async delBlog(id: string): Promise<boolean> {
        return await blogsRepositories.delBlog(id)
    }
}
