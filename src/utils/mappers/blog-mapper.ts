import {WithId} from "mongodb";
import {BlogDbType} from "../../models/db/db.models";
import {OutputBlogModel} from "../../models/blog/output/output-type-blogs";

export const blogMapper = (blog: WithId<BlogDbType>): OutputBlogModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}