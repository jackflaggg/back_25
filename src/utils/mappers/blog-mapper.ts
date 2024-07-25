import {WithId} from "mongodb";
import {BlogDbType} from "../../models/db/db.models";

export const blogMapper = (blog: WithId<BlogDbType>) => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}