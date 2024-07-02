import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common-types";
import {InputCreatePostModel} from "../../models/post/input/create.post.input.models";
import {OutputPostModel} from "../../models/post/output/post.output.models";
import {PostCreateType} from "../../models/db/db.models";
import {postsRepository} from "../../repositories/posts-db-repository";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {ObjectId} from "mongodb";

export const createPostController = async (req: RequestWithBody<InputCreatePostModel>,
                                           res:ResponseBody<OutputPostModel>) => {
    const { title, shortDescription, content, blogId} = (req.body);

    if (ObjectId.isValid(blogId)) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return
    }

    const blog = await blogsRepositories.giveOneToIdBlog(blogId)
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

    const createdPost = await postsRepository.createPost(newPost);

    res.status(HTTP_STATUSES.CREATED_201);
}