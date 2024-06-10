import {db} from "../db/db";
import {BlogDbType} from "../types/types";

import { v4 as uuidv4 } from 'uuid';
import {BlogInputModel, BlogViewModel} from "../input-output-types/blogs-types";

const userId = uuidv4();

export const blogsRepositories = {
    getAll(): BlogDbType[] {
        return db.blogs ? db.blogs.map(elem => this.map(elem)) : [];
    },
    getOne(id: string | number) {
        return db.blogs.find(b => b.id === id);
    },
    getOneAndMap(id: string | number) {
        const blog = this.getOne(id)!; // опасно
        return this.map(blog);
    },
    create(blog: BlogInputModel) {
        const newBlog: BlogDbType = {
            id: userId,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        }
        db.blogs.push(newBlog);
        return newBlog;
    },
    put(blog: BlogInputModel,id: string | number) {
        db.blogs = db.blogs.map(b => b.id === id ? {...b, ...blog, blogName: blog.name} : b)
    },
    del(id: string | number): void {
        for (let i = 0; i < db.blogs.length; i++) {
            if (db.blogs[i].id === id){
                db.blogs.splice(i, 1);
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
