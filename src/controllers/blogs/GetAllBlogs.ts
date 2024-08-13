import {HTTP_STATUSES, RequestWithQuery, ResponseBody} from "../../models/common/common-types";
import {OutputBlogModel} from "../../models/blog/output/output-type-blogs";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {helperToBlog} from "../../utils/helpers/helper-query-get";
import {InQueryBlogModel} from "../../models/blog/input/input-type-blogs";

export const AllBlogController = async (req: RequestWithQuery<InQueryBlogModel>,
                                        res:ResponseBody<OutputBlogModel[]>) => {
    const sortData = helperToBlog(req.query);
    const allBlogs = await blogsQueryRepositories.getAllBlog(sortData)

    res.status(HTTP_STATUSES.OK_200).send(allBlogs);
}