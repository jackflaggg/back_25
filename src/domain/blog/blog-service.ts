import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {BlogCreateType} from "../../models/db/db.models";
import {InputUpdateBlogModel} from "../../models/blog/input/update.blog.input.models";

export const blogsService = {
    async giveOneToIdBlog(id: string): Promise<OutputBlogModel | null> {
        return await blogsRepositories.giveOneToIdBlog(id)
    },
    async createBlog(blog: BlogCreateType): Promise<string | null>{
        return await blogsRepositories.createBlog(blog);
    },
    async putBlog(id: string, blog: InputUpdateBlogModel): Promise<boolean> {
        return await blogsRepositories.putBlog(id, blog);
    },
    async delBlog(id: string): Promise<boolean> {
        return await blogsRepositories.delBlog(id)
    }
}
