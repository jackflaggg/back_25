import {blogsRepositories} from "../../../repositories/blogs-in-memory-repository";
import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../../types/types";
import {BlogInputModel, BlogViewModel} from "../../../input-output-types/blogs-types";

export const createBlogController = (req: RequestWithBody<BlogInputModel>, res:ResponseBody<BlogViewModel>) => {
    const newBlog = blogsRepositories.create(req.body);
    const findCreateBlog = blogsRepositories.getOneAndMap(newBlog);
    res.status(HTTP_STATUSES.CREATED_201).send(findCreateBlog);
}