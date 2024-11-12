import {HTTP_STATUSES} from "../../models/common/common.types";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs.query.repository";
import {validateId} from "../../utils/helpers/helper.validate.id";
import {InQueryBlogModel} from "../../models/blog/input/input.type.blogs";
import {queryHelperToPost} from "../../utils/helpers/helper.query.get";
import {
    BlogParamsModel,
    RequestWithParamsAndQuery,
    ResponseBody
} from "../../models/common/req_res_params/request.response.params";
import {OutGetAllPosts} from "../../models/post/output/output.type.posts";

export const getAllPostsToBlog = async (req: RequestWithParamsAndQuery<BlogParamsModel, InQueryBlogModel>, res: ResponseBody<OutGetAllPosts>) => {
    const blogId = req.params.id;

    if (!validateId(blogId)){
        console.log(`[blogId] не валиден`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const blogPost = await blogsQueryRepositories.giveOneToIdBlog(blogId);

    if(!blogPost){
        console.log(`[blogPost] вернул null`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const sortDataQuery = queryHelperToPost(req.query);

    const allPosts = await blogsQueryRepositories.getPostsToBlogID(blogId, sortDataQuery);
    if (!allPosts){
        console.log(`[allPosts] вернул хрень`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(allPosts);
    return;
}