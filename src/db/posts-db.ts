import {PostDbType} from "../types/types";

export const postOne: PostDbType = {
    id: String(new Date()),
    title: 'new post!',
    shortDescription: 'this is a new post!',
    content: 'post',
    blogId: '123',
    blogName: 'name blog',
}