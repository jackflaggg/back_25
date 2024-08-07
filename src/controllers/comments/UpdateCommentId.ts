import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common/common-types";
import {InputCreatePostModel} from "../../models/post/input/create.post.input.models";
import {OutputPostModel} from "../../models/post/output/post.output.models";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {postsService} from "../../domain/post/post-service";
import {PostCreateType} from "../../models/db/db.models";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";

export const updateCommentController = async (req: RequestWithBody<InputCreatePostModel>,
                                           res:ResponseBody<OutputPostModel>) => {
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

    const createdPost = await postsService.createPost(req.body as PostCreateType, blog);
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
}