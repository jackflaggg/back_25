import {BlogParamsModel, HTTP_STATUSES, RequestWithParams, ResponseBody} from "../../models/common-types";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {ObjectId} from "mongodb";
import {blogsService} from "../../domain/blog/blog-service";

export const OneBlogController = async (req: RequestWithParams<BlogParamsModel>,
                                        res:ResponseBody<OutputBlogModel>) => {
    const { id} = req.params;
    if (!ObjectId.isValid(id)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const blogId = await blogsService.giveOneToIdBlog(id);
    if (!blogId){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }
    res.status(HTTP_STATUSES.OK_200).send(blogId);
}