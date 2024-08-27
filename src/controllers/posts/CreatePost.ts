import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common/common-types";
import {postsService} from "../../domain/post/post-service";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {OutPostModel} from "../../models/post/output/output-type-posts";
import {InCreatePostModel} from "../../models/post/input/input-type-posts";

export const createPostController = async (req: RequestWithBody<Omit<InCreatePostModel, 'blogName' | 'createdAt'>>,
                                           res:ResponseBody<OutPostModel>) => {
    const { blogId} = req.body
    if (!validateId(blogId)) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return
    }

    const blog = await blogsQueryRepositories.giveOneToIdBlog(blogId)
    if (!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    const createdPost = await postsService.createPost(req.body as InCreatePostModel, blog);
    if(!createdPost){
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const findCreatePost = await postsQueryRepository.giveOneToIdPost(createdPost);

    if (!findCreatePost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(HTTP_STATUSES.CREATED_201).send(findCreatePost);
    return;
}