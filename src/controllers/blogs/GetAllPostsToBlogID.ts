import {BlogParamsModel, HTTP_STATUSES, RequestWithParamsAndQuery} from "../../models/common/common-types";
import {Response} from "express";
import {QueryBlogInputModels} from "../../models/blog/input/get-query.blog.input.models";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {helperToPost} from "../../utils/helpers/helper-query-get";
import {validateId} from "../../utils/helpers/helper-validate-id";

export const getAllPostsToBlogID = async (req: RequestWithParamsAndQuery<BlogParamsModel, QueryBlogInputModels>, res: Response<any>) => {
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

    const sortDataQuery = helperToPost(req.query);

    const allPosts = await blogsQueryRepositories.getPostsToBlogID(blogId, sortDataQuery);
    if (!allPosts){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.status(HTTP_STATUSES.OK_200).send(allPosts);
}