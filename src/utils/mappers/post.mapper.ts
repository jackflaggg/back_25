import {WithId} from "mongodb";
import {PostDbType} from "../../models/db/db.models";
import {OutPostModel} from "../../models/post/output/output.type.posts";

export const postMapper = (post: WithId<PostDbType>): OutPostModel => ({
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogName: post.blogName,
        createdAt: post.createdAt,
        blogId: post.blogId
})