import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common-types";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {InputCreateBlogModel} from "../../models/blog/input/create.blog.input.models";
import {blogsService} from "../../domain/blog/blog-service";
import {blogsQueryRepositories} from "../../repositories/blogs-query-repository";

export const createBlogController = async (req: RequestWithBody<InputCreateBlogModel>,
                                           res:ResponseBody<OutputBlogModel>) => {
    const createdBlogId = await blogsService.createBlog(req.body)
    const blog = await blogsQueryRepositories.giveOneToIdBlog(createdBlogId!);

    if (!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUSES.CREATED_201).send(blog);
}