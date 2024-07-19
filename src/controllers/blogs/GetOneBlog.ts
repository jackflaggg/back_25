import {BlogParamsModel, HTTP_STATUSES, RequestWithParams, ResponseBody} from "../../models/common-types";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {ObjectId} from "mongodb";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";

export const OneBlogController = async (req: RequestWithParams<BlogParamsModel>,
                                        res:ResponseBody<OutputBlogModel>) => {
    const { id} = req.params;
    if (!ObjectId.isValid(id)){
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