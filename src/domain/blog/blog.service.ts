import {blogsRepositories} from "../../repositories/blogs/blogs.db.repository";
import {InCreateBlogModel, InCreateToBlogModel, InUpdateBlogModel} from "../../models/blog/input/input.type.blogs";
import {NewBlogModel} from "../../models/blog/service/service.model";
import {InCreatePostToBlogInputModel} from "../../models/post/input/input.type.posts";
import {ErrorAuth, ViewModel} from "../../models/auth/ouput/auth.service.models";
import {ResultStatus, ResultSuccess} from "../../models/common/errors/errors.type";

export const blogsService = {
    async createBlog(blog: InCreateBlogModel):  Promise<ViewModel>{
        const { name, description, websiteUrl } = blog;

        const newBlog: NewBlogModel = {
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }

        const create = await blogsRepositories.createBlog(newBlog);
        if (!create){
            return new ErrorAuth(
                ResultStatus.BadRequest,
                {field: '[blogsRepositories]', message: 'ошибка при создании блога'}
            )
        }
        return {
            status: ResultSuccess.Success,
            data: create
        }
    },
    async createPostToBlogInputModel(blog: InCreateToBlogModel, post: InCreatePostToBlogInputModel): Promise<ViewModel> {
        const { title, shortDescription, content } = post;
        const newPost = {
            title,
            shortDescription,
            content,
            blogId: blog.id,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }

        const createPost = await blogsRepositories.createPostToBlogID(blog!.id, newPost);
        if (!createPost){
            return new ErrorAuth(
                ResultStatus.BadRequest,
                {field: '[blogsRepositories]', message: 'ошибка при создании поста для блога'}
            )
        }
        return {
            status: ResultSuccess.Success,
            data: createPost
        }
    },
    async putBlog(id: string, blog: InUpdateBlogModel): Promise<ViewModel> {
        const updateBlog = await blogsRepositories.putBlog(id, blog);
        if (!updateBlog){
            return new ErrorAuth(
                ResultStatus.BadRequest,
                {field: '[blogsRepositories]', message: 'ошибка при обновлении блога'}
            )
        }
        return {
            status: ResultSuccess.Success,
            data: updateBlog
        }
    },
    async delBlog(id: string): Promise<ViewModel> {
        const del =  await blogsRepositories.delBlog(id);
        if (!del){
            return new ErrorAuth(
                ResultStatus.BadRequest,
                {field: '[blogsRepositories]', message: 'ошибка при удалении блога'}
            )
        }
        return {
            status: ResultSuccess.Success,
            data: del
        }
    }
}
