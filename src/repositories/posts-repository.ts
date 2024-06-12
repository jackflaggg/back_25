import {db} from "../db/db";
import {PostDbType} from "../types/types";
import {PostInputModel, PostViewModel} from "../input-output-types/posts-types";
import {blogsRepositories} from "./blogs-repository";


export const postsRepository = {
    getAll() : PostDbType[]{
        return db.posts ? db.posts : [];
    },
    giveOne(id: string)  {
        return db.posts.find(elem => elem.id === id);
    },
    giveOneAndMap(id: string): PostViewModel {
        const post = this.giveOne(id)!;
        return this.map(post)
    },
    create(post: PostInputModel) {
        const newPost = {
            id: crypto.randomUUID(),
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: db.blogs[0].id,
            blogName: blogsRepositories.getOne(db.blogs[0].id)!.name,
        }
        db.posts.push(newPost);
        return newPost.id;
    },
    put(post: PostInputModel,id: string) {
        db.posts = db.posts.map(b => b.id === id ? {...b, ...post, id: b.id, blogName: blogsRepositories.getOne(db.blogs[0].id)!.name} : b)
    },
    del(id: string): void {
        for (let i = 0; i < db.posts.length; i++) {
            if (db.posts[i].id === id){
                db.posts.splice(i, 1);
                return
            }
        }
    },
    map(post: PostDbType) {
        const postForOutput: PostViewModel = {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
        }
        return postForOutput
    }
}