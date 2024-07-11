import {BlogParamsModel, HTTP_STATUSES, RequestWithParamsAndQuery} from "../../models/common-types";
import {Response} from "express";
import {QueryBlogInputModels} from "../../models/blog/input/get-query.blog.input.models";
import {postMapper} from "../../models/post/mapper/post-mapper";
import {helperToPost} from "../../middlewares/helper-query-get";
import {ObjectId} from "mongodb";
import {blogsQueryRepositories} from "../../repositories/blogs-query-repository";
import {postsQueryRepository} from "../../repositories/posts-query-repository";
import {QueryPostInputModels} from "../../models/post/input/get-query.post.input.models";
import {blogsService} from "../../domain/blog/blog-service";

export const getAllPostsToBlogID = async (req: RequestWithParamsAndQuery<BlogParamsModel, QueryBlogInputModels>, res: Response<any>) => {
    const blogId = req.params.id;

    if (!ObjectId.isValid(blogId)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const blogPost = await blogsQueryRepositories.giveOneToIdBlog(blogId);

    if(!blogPost){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const sortData = helperToPost(req.query);

    const allPosts = await blogsQueryRepositories.getPostsToBlogID(blogId, sortData);

    res.status(HTTP_STATUSES.OK_200).send(allPosts);



}