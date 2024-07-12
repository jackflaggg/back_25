import {BlogParamsModel, HTTP_STATUSES, RequestWithParamsAndBody, ResponseBody} from "../../models/common-types";
import {CreatePostToBlogInputModel} from "../../models/blog/input/create.post.to.blog.input";
import {OutputPostModel} from "../../models/post/output/post.output.models";
import {ObjectId} from "mongodb";
import {blogsQueryRepositories} from "../../repositories/blogs-query-repository";
import {postsQueryRepository} from "../../repositories/posts-query-repository";
import {blogsService} from "../../domain/blog/blog-service";

export const createNewPostToBlogID = async(req: RequestWithParamsAndBody<BlogParamsModel, CreatePostToBlogInputModel>, res: ResponseBody<OutputPostModel>) => {
    console.log(typeof req.params.id)
    const {id} = req.params;
    if (!ObjectId.isValid(id)) {
        console.log('err: not valid blog id');
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    const blog = await blogsQueryRepositories.giveOneToIdBlog(id);

    if(!blog){
        console.log('not search blog!')
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    const createdNewPost = await blogsService.createBlog(req.body)


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
}