import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {BlogCreateType} from "../../models/db/db.models";
import {InputUpdateBlogModel} from "../../models/blog/input/update.blog.input.models";
import {InputCreateBlogModel} from "../../models/blog/input/create.blog.input.models";

export const blogsService = {
    async createBlog(blog: InputCreateBlogModel): Promise<string | null>{
        return await blogsRepositories.createBlog(blog);
    },
    async putBlog(id: string, blog: InputUpdateBlogModel): Promise<boolean> {
        return await blogsRepositories.putBlog(id, blog);
    },
    async delBlog(id: string): Promise<boolean> {
        return await blogsRepositories.delBlog(id)
    }
}
