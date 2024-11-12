import {Response} from "express";
import {blogsService} from "../../domain/blog/blog.service";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs.query.repository";
import {validateId} from "../../utils/helpers/helper.validate.id";
import {BlogParamsModel, RequestWithParams} from "../../models/common/req_res_params/request.response.params";
import {HTTP_STATUSES} from "../../models/common/common.types";

export const deleteBlogController = async (req: RequestWithParams<BlogParamsModel>,
                                           res:Response) => {
    const {id} = req.params;

    if (!validateId(id)){
        console.log(`[id] не валиден`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const blog = await blogsQueryRepositories.giveOneToIdBlog(id)
    if (!blog){
        console.log(`[blog] не в репозитории не найден`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const deleteBlog = await blogsService.delBlog(id);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}