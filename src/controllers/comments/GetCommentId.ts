import {HTTP_STATUSES} from "../../models/common/common-types";
import {Request, Response} from "express";
import {blogsService} from "../../domain/blog/blog-service";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";

export const getCommentIdController = async (req: Request,
                                           res: Response) => {
    const createdBlogId = await blogsService.createBlog(req.body);

    const blog = await blogsQueryRepositories.giveOneToIdBlog(createdBlogId!);

    if (!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(blog);
}