import {OutPostModel} from "../../models/post/output/output.type.posts";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs.query.repository";
import {postsQueryRepository} from "../../repositories/posts/posts.query.repository";
import {blogsService} from "../../domain/blog/blog.service";
import {validateId} from "../../utils/helpers/helper.validate.id";
import {InCreatePostToBlogInputModel} from "../../models/blog/input/input.type.blogs";
import {
    BlogParamsModel,
    RequestWithParamsAndBody,
    ResponseBody
} from "../../models/common/req_res_params/request.response.params";
import {HTTP_STATUSES} from "../../models/common/common.types";

export const createNewPostToBlog = async(req: RequestWithParamsAndBody<BlogParamsModel, InCreatePostToBlogInputModel>, res: ResponseBody<OutPostModel>) => {

    const {id} = req.params;

    if (!validateId(id)) {
        console.log('err: not valid blog id');
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    const blog = await blogsQueryRepositories.giveOneToIdBlog(id);

    if(!blog?.id){
        console.log('not search blog!')
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    const createdNewPost = await blogsService.createPostToBlogInputModel(blog, req.body)

    if (createdNewPost.extensions) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const searchPostToId = await postsQueryRepository.giveOneToIdPost(createdNewPost.data);

    if(!searchPostToId){
        console.log('not search create post!')
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(searchPostToId);
    return;
}