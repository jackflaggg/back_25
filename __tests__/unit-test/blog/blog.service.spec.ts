import {blogsRepositories} from "../../../src/repositories/blogs/blogs-db-repository";
import {createString} from "../../helpers-e2e/datatests";
import {ObjectId} from "mongodb";
import {blogsService} from "../../../src/domain/blog/blog-service";

jest.mock('../../../src/repositories/blogs/blogs-db-repository', () => ({
    blogsRepositories: {
        createBlog: jest.fn(),
        putBlog: jest.fn(),
        createPostToBlogID: jest.fn(),
        delBlog: jest.fn(),
    }
}));

let createBlogData = {
    id: new ObjectId().toString(),
    name: createString(10),
    description: createString(10),
    websiteUrl: createString(10),
    createdAt: new Date().toISOString(),
    isMembership: false
}

let createPostToBlogModel = {
    title: createString(10),
    shortDescription: createString(10),
    content: createString(10),
    blogId: createBlogData.id,
    blogName: createBlogData.name,
    createdAt: new Date().toISOString(),
}

describe('blogsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createBlog', () => {
        it('creates blog success', async() => {
            (blogsRepositories.createBlog as jest.Mock).mockResolvedValueOnce(createBlogData.id);

            const response = await blogsService.createBlog({
                name: createString(10),
                description: createString(10),
                websiteUrl: createString(10)});

            expect(response).toBe(createBlogData.id)
        });
    });

    describe('createPostToBlogInputModel', () => {
        it('creates post to blog success', async() => {
            const expectedId = new ObjectId().toString();
            (blogsRepositories.createPostToBlogID as jest.Mock).mockResolvedValueOnce(expectedId);

            let InCreateToBlogModel = {
                id: new ObjectId().toString(),
                name: createString(10),
            }

            let InCreatePostToBlogInputModel = {
                title: createString(10),
                shortDescription: createString(10),
                content: createString(10)
            }

            const response = await blogsService.createPostToBlogInputModel(InCreateToBlogModel,InCreatePostToBlogInputModel);

            expect(response).toBe(expectedId)
        });
    });

    describe('putBlog', () => {
        it('put blog success', async() => {

            const updateBlog = {
                id: new ObjectId().toString(),
                name: createString(11),
                description: createString(11),
                websiteUrl: createString(11),
            };

            const {id, ...blogUpdate} = updateBlog;

            (blogsRepositories.putBlog as jest.Mock).mockResolvedValueOnce(true);

            const response = await blogsService.putBlog(updateBlog.id, blogUpdate);

            expect(response).toBe(true)
        });
    });

    describe('delBlog', () => {
        it('del blog success', async() => {

            (blogsRepositories.delBlog as jest.Mock).mockResolvedValueOnce(true);

            const response = await blogsService.delBlog(createBlogData.id);

            expect(response).toBe(true)
        });
    });
})