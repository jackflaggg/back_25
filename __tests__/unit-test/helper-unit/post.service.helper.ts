import { ObjectId } from 'mongodb';
import {createString} from "../../helpers-e2e/datatests";
import {randomUUID} from "node:crypto"; // или другой необходимый импорт

export const createBlog = () => ({
    id: new ObjectId().toString(),
    name: createString(10),
});

export const createPostToCreate = (blogId: string) => ({
    title: createString(10),
    shortDescription: createString(10),
    content: createString(10),
    blogId,
    blogName: createString(10),
    createdAt: new Date().toISOString()
});

export const createPostDbType = (blogId: string) => ({
    id: new ObjectId().toString(),
    title: createString(10),
    shortDescription: createString(10),
    content: createString(10),
    blogId,
    blogName: createString(10),
});

export const createUserById = () => ({
    id: new ObjectId().toString(),
    title: createString(10),
    shortDescription: createString(10),
    content: createString(10),
    blogId: new ObjectId().toString(),
    blogName: createString(10),
    createdAt: new Date().toISOString(),
});

export const createPostModel = () => ({
    id: new ObjectId().toString(),
    login: createString(10),
    email: 'testuser@mail.com',
    createdAt: new Date().toISOString(),
    emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: new Date(),
        isConfirmed: false
    }
});
