import {WithId} from "mongodb";
import {PostDbType} from "../../db/db.models";

export const postMapper = (post: WithId<PostDbType>) => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogName: post.blogName,
        createdAt: post.createdAt,
        blogId: post.blogId,
    }
}