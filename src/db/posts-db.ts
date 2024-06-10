import {PostDbType} from "../types/types";
import {blogOne} from "./blogs-db";

export const postOne: PostDbType = {
    id: String(1),
    title: 'new post!',
    shortDescription: 'this is a new post!',
    content: 'post',
    blogId: blogOne.id,
    blogName: blogOne.name,
}