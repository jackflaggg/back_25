import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common-types";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {BlogCreateType} from "../../models/db/db.models";

export const createBlogController = async (req: RequestWithBody<BlogCreateType>,
                                           res:ResponseBody<OutputBlogModel>) => {
    const {name, description, websiteUrl} = req.body

    const newBlog: BlogCreateType = {
        name,
        description,
        websiteUrl,
        isMembership: false,
        createdAt: new Date().toISOString()
    }
    const createdBlogId = await blogsRepositories.createBlog(newBlog)
    if (!createdBlogId) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return
    }

    const blog = await blogsRepositories.giveOneToIdBlog(createdBlogId);
    if (!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUSES.CREATED_201).send(blog);
}