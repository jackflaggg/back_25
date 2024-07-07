import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common-types";
import {InputCreatePostModel} from "../../models/post/input/create.post.input.models";
import {OutputPostModel} from "../../models/post/output/post.output.models";
import {PostCreateType} from "../../models/db/db.models";
import {postsRepository} from "../../repositories/posts-db-repository";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {ObjectId} from "mongodb";
import {blogsService} from "../../domain/blog/blog-service";
import {postsService} from "../../domain/post/post-service";

export const createPostController = async (req: RequestWithBody<InputCreatePostModel>,
                                           res:ResponseBody<OutputPostModel>) => {
    const { title, shortDescription, content, blogId} = (req.body);

    if (!ObjectId.isValid(blogId)) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return
    }

    const blog = await blogsService.giveOneToIdBlog(blogId!)
    if (!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    const newPost: PostCreateType = {
        title,
        shortDescription,
        content,
        blogId,
        blogName: blog!.name,
        createdAt: new Date().toISOString()
    }
    const createdPost = await postsService.createPost(newPost);
    if(!createdPost){
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const findCreatePost = await postsService.giveOneToIdPost(createdPost);

    if (!findCreatePost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(HTTP_STATUSES.CREATED_201).send(findCreatePost);
}