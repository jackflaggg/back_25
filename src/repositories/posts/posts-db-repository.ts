import {postsCollections} from "../../db/db";
import {ObjectId} from "mongodb";
import {InCreatePostModel, InUpdatePostModel} from "../../models/post/input/input.type.posts";

export const postsRepository = {
    async createPost(post: InCreatePostModel): Promise<string | null> {
        const newPost = await postsCollections.insertOne(post);

        if (!newPost || !newPost.insertedId) {
            return null;
        }

        return newPost.insertedId.toString();
    },
    async putPost(post: InUpdatePostModel, id: string): Promise<boolean> {
        const updatePost = await postsCollections.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId
            }
        }, {upsert: true});

        return updatePost.acknowledged;
    },
    async delPost(id: string): Promise<boolean> {
        const deletePost = await postsCollections.deleteOne({_id: new ObjectId(id)});
        return deletePost.acknowledged;
    }
}