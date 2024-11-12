import {HTTP_STATUSES} from "../../models/common/common.types";
import {OutGetAllBlogsModel} from "../../models/blog/output/output.type.blogs";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs.query.repository";
import {queryHelperToBlog} from "../../utils/helpers/helper.query.get";
import {InQueryBlogModel} from "../../models/blog/input/input.type.blogs";
import {RequestWithQuery, ResponseBody} from "../../models/common/req_res_params/request.response.params";

export const AllBlogController = async (req: RequestWithQuery<InQueryBlogModel>,
                                        res:ResponseBody<OutGetAllBlogsModel>) => {
    const sortData = queryHelperToBlog(req.query);
    const allBlogs = await blogsQueryRepositories.getAllBlog(sortData);

    res.status(HTTP_STATUSES.OK_200).send(allBlogs);
    return;
}