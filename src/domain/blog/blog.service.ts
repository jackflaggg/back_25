import {blogsRepositories} from "../../repositories/blogs/blogs.db.repository";
import {InCreateBlogModel, InCreateToBlogModel, InUpdateBlogModel} from "../../models/blog/input/input.type.blogs";
import {NewBlogModel} from "../../models/blog/service/service.model";
import {InCreatePostToBlogInputModel} from "../../models/post/input/input.type.posts";

export const blogsService = {
    async createBlog(blog: InCreateBlogModel): Promise<string | null>{
        const { name, description, websiteUrl } = blog;

        const newBlog: NewBlogModel = {
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }

        return await blogsRepositories.createBlog(newBlog);
    },
    async createPostToBlogInputModel(blog: InCreateToBlogModel, post: InCreatePostToBlogInputModel): Promise<string | null> {
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
    async putBlog(id: string, blog: InUpdateBlogModel): Promise<boolean> {
        return await blogsRepositories.putBlog(id, blog);
    },
    async delBlog(id: string): Promise<boolean> {
        return await blogsRepositories.delBlog(id)
    }
}
