import {HTTP_STATUSES} from "../../models/common/common-types";
import {Response} from "express";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {InQueryBlogModel} from "../../models/blog/input/input-type-blogs";
import {queryHelperToPost} from "../../utils/helpers/helper-query-get";
import {BlogParamsModel, RequestWithParamsAndQuery} from "../../models/common/req_res_params/request-response-params";

export const getAllPostsToBlogID = async (req: RequestWithParamsAndQuery<BlogParamsModel, InQueryBlogModel>, res: Response<any>) => {
    const blogId = req.params.id;

    if (!validateId(blogId)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const blogPost = await blogsQueryRepositories.giveOneToIdBlog(blogId);

    if(!blogPost){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const sortDataQuery = queryHelperToPost(req.query);

    const allPosts = await blogsQueryRepositories.getPostsToBlogID(blogId, sortDataQuery);
    if (!allPosts){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.status(HTTP_STATUSES.OK_200).send(allPosts);
    return
}