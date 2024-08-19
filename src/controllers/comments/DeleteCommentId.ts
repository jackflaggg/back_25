import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common/common-types";
import {OutPostModel} from "../../models/post/output/output-type-posts";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {postsService} from "../../domain/post/post-service";
import {PostCreateType} from "../../models/db/db.models";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {InCreatePostModel} from "../../models/post/input/input-type-posts";
import {InCreateBlogModel} from "../../models/blog/input/input-type-blogs";
import {OutputBlogModel} from "../../models/blog/output/output-type-blogs";
import {blogsService} from "../../domain/blog/blog-service";

export const deleteCommentController = async (req: RequestWithBody<InCreateBlogModel>,
                                           res:ResponseBody<OutputBlogModel>) => {
    const createdBlogId = await blogsService.createBlog(req.body);

    const blog = await blogsQueryRepositories.giveOneToIdBlog(createdBlogId!);

    if (!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(blog);
}