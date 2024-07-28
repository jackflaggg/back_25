import {BlogParamsModel, HTTP_STATUSES, RequestWithParams, ResponseBody} from "../../models/common/common-types";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {validateId} from "../../utils/helpers/helper-validate-id";

export const OneBlogController = async (req: RequestWithParams<BlogParamsModel>,
                                        res:ResponseBody<OutputBlogModel>) => {
    const { id} = req.params;
    if (!validateId(id)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const blogId = await blogsQueryRepositories.giveOneToIdBlog(id);
    if (!blogId){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }
    res.status(HTTP_STATUSES.OK_200).send(blogId);
}