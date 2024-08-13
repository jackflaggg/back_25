import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common/common-types";
import {OutputBlogModel} from "../../models/blog/output/output-type-blogs";
import {blogsService} from "../../domain/blog/blog-service";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {InCreateBlogModel} from "../../models/blog/input/input-type-blogs";

export const createBlogController = async (req: RequestWithBody<InCreateBlogModel>,
                                           res:ResponseBody<OutputBlogModel>) => {
    const createdBlogId = await blogsService.createBlog(req.body);

    const blog = await blogsQueryRepositories.giveOneToIdBlog(createdBlogId!);

    if (!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUSES.CREATED_201).send(blog);
}