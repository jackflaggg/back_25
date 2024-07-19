import {blogsCollections, postsCollections} from "../../db/db";
import {ObjectId} from "mongodb";
import {InputUpdateBlogModel} from "../../models/blog/input/update.blog.input.models";
import {BlogDbType} from "../../models/db/db.models";

export const blogsRepositories = {
    async createBlog(blog: BlogDbType): Promise<string | null>{
        const newBlog = await blogsCollections.insertOne(blog)
        if (!newBlog || !newBlog.insertedId) {
            return null;
        }
        return newBlog.insertedId.toString();
    },

    async putBlog(id: string, blog: InputUpdateBlogModel): Promise<boolean> {
        const updateBlog = await blogsCollections.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                }
            }, {upsert: true})
            return updateBlog && updateBlog.acknowledged
    },
    async delBlog(id: string): Promise<boolean> {
        const deleteBlog = await blogsCollections.deleteOne({_id: new ObjectId(id)});
        return deleteBlog.acknowledged;
    },

    async createPostToBlogID(blogId: string, bodyPost: any): Promise<any> {
        const blog = await blogsCollections.findOne({_id: new ObjectId(blogId)});

        if (!blog){
            return null;
        }

        const newPost = await postsCollections.insertOne(bodyPost);

        return newPost.insertedId.toString();

    }
}
