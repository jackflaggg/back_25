import {blogsCollections} from "../db/db";
import {OutputBlogModel} from "../models/blog/output/blog.output.models";
import {ObjectId, WithId} from "mongodb";
import {BlogCreateType, BlogDbType} from "../models/db/db.models";
import {InputUpdateBlogModel} from "../models/blog/input/update.blog.input.models";

export const blogsRepositories = {
    async getAllBlog(): Promise<OutputBlogModel[]> {
        const blogs = await blogsCollections
            .find()
            .toArray();
        return blogs.map(blog => this.blogMapper(blog));
    },
    async giveOneToIdBlog(id: string): Promise<OutputBlogModel | null> {
        const blog = await blogsCollections.findOne({_id: new ObjectId(id)});

        if (blog === null) {
            return null;
        }
        return this.blogMapper(blog)
    },
    async createBlog(blog: BlogCreateType): Promise<string | null>{
        const newBlog = await blogsCollections.insertOne(blog)
        if (!newBlog || !newBlog.insertedId) {
            return null;
        }
        return newBlog.insertedId.toString();
    },
    async putBlog(id: string, blog: InputUpdateBlogModel): Promise<boolean> {
        try {
            const updateBlog = await blogsCollections.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                }
            }, {upsert: true})
            return updateBlog && updateBlog.acknowledged
        } catch(e) {
            console.error('An error occurred while updating the blog:', e);
            return false;
        }
        /*, {upsert: true})*/
    },
    async delBlog(id: string): Promise<boolean> {
        const deleteBlog = await blogsCollections.deleteOne({_id: new ObjectId(id)});
        return deleteBlog.acknowledged;
    },
    blogMapper(blog: WithId<BlogDbType>) {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership,
        }
    }
}
