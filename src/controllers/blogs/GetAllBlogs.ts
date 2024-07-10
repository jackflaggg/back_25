import {HTTP_STATUSES, RequestWithQuery, ResponseBody} from "../../models/common-types";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {blogsQueryRepositories} from "../../repositories/blogs-query-repository";
import {QueryBlogInputModels} from "../../models/blog/input/get-query.blog.input.models";
import {helperToBlog} from "../../middlewares/helper-query-get";

export const AllBlogController = async (req: RequestWithQuery<QueryBlogInputModels>,
                                        res:ResponseBody<OutputBlogModel[]>) => {
    const sortData: QueryBlogInputModels = helperToBlog(req.query)
    console.log(sortData)

    const allBlogs = await blogsQueryRepositories.getAllBlog(sortData)

    res.status(HTTP_STATUSES.OK_200).send(allBlogs);
}