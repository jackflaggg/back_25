import {OutBlogModel} from "../../models/blog/output/output.type.blogs";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs.query.repository";
import {validateId} from "../../utils/helpers/helper.validate.id";
import {
    BlogParamsModel,
    RequestWithParams,
    ResponseBody
} from "../../models/common/req_res_params/request.response.params";
import {HTTP_STATUSES} from "../../models/common/common.types";

export const OneBlogController = async (req: RequestWithParams<BlogParamsModel>,
                                        res:ResponseBody<OutBlogModel>) => {
    const { id} = req.params;

    if (!validateId(id)){
        console.log(`[id] не валиден`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const blogId = await blogsQueryRepositories.giveOneToIdBlog(id);
    if (!blogId){
        console.log(`[blogId] вернул null`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(HTTP_STATUSES.OK_200).send(blogId);
    return;
}