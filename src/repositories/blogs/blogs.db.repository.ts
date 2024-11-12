import {blogsCollections, postsCollections} from "../../db/db";
import {ObjectId} from "mongodb";
import {BlogDbType} from "../../models/db/db.models";
import {InCreatePostToBlogModel, InUpdateBlogModel} from "../../models/blog/input/input.type.blogs";

export const blogsRepositories = {
    async createBlog(blog: BlogDbType): Promise<string | null>{
        const newBlog = await blogsCollections.insertOne(blog)
        if (!newBlog || !newBlog.insertedId) {
            return null;
        }
        return newBlog.insertedId.toString();
    },

    async putBlog(blogId: string, blog: InUpdateBlogModel): Promise<boolean> {
        const updateBlog = await blogsCollections.updateOne({_id: new ObjectId(blogId)}, {
                $set: {
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                }
            }, {upsert: true})
            return updateBlog && updateBlog.acknowledged
    },
    async delBlog(blogId: string): Promise<boolean> {
        const deleteBlog = await blogsCollections.deleteOne({_id: new ObjectId(blogId)});
        return deleteBlog.acknowledged;
    },

    async createPostToBlogID(blogId: string, bodyPost: InCreatePostToBlogModel): Promise<null | string> {
        const blog = await blogsCollections.findOne({_id: new ObjectId(blogId)});

        if (!blog){
            return null;
        }

        const newPost = await postsCollections.insertOne(bodyPost);

        return newPost.insertedId.toString();

    }
}
