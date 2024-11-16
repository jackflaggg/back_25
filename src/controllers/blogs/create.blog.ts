import {HTTP_STATUSES} from "../../models/common/common.types";
import {OutBlogModel} from "../../models/blog/output/output.type.blogs";
import {blogsService} from "../../domain/blog/blog.service";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs.query.repository";
import {InCreateBlogModel} from "../../models/blog/input/input.type.blogs";
import {RequestWithBody, ResponseBody} from "../../models/common/req_res_params/request.response.params";

export const createBlogController = async (req: RequestWithBody<InCreateBlogModel>,
                                           res:ResponseBody<OutBlogModel>) => {
    const createdBlogId = await blogsService.createBlog(req.body);

    if (createdBlogId.extensions) {
        console.log(`[createdBlogId] в сервисе по созданию блога что-то пошло не так!`);
        res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
        return;
    }
    const blog = await blogsQueryRepositories.giveOneToIdBlog(createdBlogId.data);

    if (!blog) {
        console.log(`[blog] в репозитории вернул null!`)
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(blog);
    return;
}