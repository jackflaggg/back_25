import {Request} from "express";
import {HTTP_STATUSES, ResponseBody} from "../../models/common-types";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {blogsService} from "../../domain/blog/blog-service";

export const AllBlogController = async (req: Request,
                                        res:ResponseBody<OutputBlogModel[]>) => {
    const allBlogs = await blogsService.getAllBlog()
    res.status(HTTP_STATUSES.OK_200).send(allBlogs);
}