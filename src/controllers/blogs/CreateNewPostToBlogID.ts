import {BlogParamsModel, HTTP_STATUSES, RequestWithParamsAndBody, ResponseBody} from "../../models/common/common-types";
import {OutputPostModel} from "../../models/post/output/post.output.models";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {blogsService} from "../../domain/blog/blog-service";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {InCreatePostToBlogInputModel} from "../../models/blog/input/input-type-blogs";

export const createNewPostToBlogID = async(req: RequestWithParamsAndBody<BlogParamsModel, InCreatePostToBlogInputModel>, res: ResponseBody<OutputPostModel>) => {

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

    if (!createdNewPost) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const searchPostToId = await postsQueryRepository.giveOneToIdPost(createdNewPost);

    if(!searchPostToId){
        console.log('not search create post!')
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(searchPostToId);
    return;
}