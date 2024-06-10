import {db} from "../db/db";
import {BlogDbType, PostDbType} from "../types/types";
import {PostInputModel, PostViewModel} from "../input-output-types/posts-types";
import {v4 as uuidv4} from "uuid";
import {blogsRepositories} from "./blogs-repository";
import {BlogInputModel, BlogViewModel} from "../input-output-types/blogs-types";
const postId = uuidv4();

export const postsRepository = {
    getAll() : PostDbType[]{
        return db.posts ? db.posts : [];
    },
    giveOne(id: string) : PostDbType | null{
        const foundElement = db.posts.find(elem => elem.id === id);
        return foundElement ? foundElement : null;
    },
    create(post: PostInputModel): PostViewModel {
        const newPost = {
            id: postId,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blogsRepositories.getOne(post.blogId)!.name,
        }
        db.posts.push(newPost);
        return newPost;
    },
    put(post: PostInputModel,id: string | number) {
        db.posts = db.posts.map(b => b.id === id ? {...b, ...post, id: b.id, blogName: blogsRepositories.getOne(b.id)!.name} : b)
    },
    del(id: string | number): void {
        for (let i = 0; i < db.posts.length; i++) {
            if (db.posts[i].id === id){
                db.posts.splice(i, 1);
                return
            }
        }
    },
    map(blog: BlogDbType) {
        const blogForOutput: BlogViewModel = {
            id: blog.id,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            name: blog.name,
        }
        return blogForOutput
    }
}