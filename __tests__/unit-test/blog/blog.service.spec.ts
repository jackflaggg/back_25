import {blogsRepositories} from "../../../src/repositories/blogs/blogs-db-repository";
import {createString} from "../../helpers-e2e/datatests";
import {ObjectId} from "mongodb";
import {blogsService} from "../../../src/domain/blog/blog-service";
import {InCreatePostToBlogInputModel} from "../../../src/models/post/input/input-type-posts";

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

    // describe('createBlog', () => {
    //     it('creates blog success', async() => {
    //         (blogsRepositories.createBlog as jest.Mock).mockResolvedValueOnce(createBlogData.id);
    //
    //         const response = await blogsService.createBlog({
    //             name: createString(10),
    //             description: createString(10),
    //             websiteUrl: createString(10)});
    //
    //         expect(response).toBe(createBlogData.id)
    //     });
    // });
    //
    // describe('createBlog', () => {
    //     it('creates blog success', async() => {
    //         (blogsRepositories.createBlog as jest.Mock).mockResolvedValueOnce(createBlogData.id);
    //
    //         const response = await blogsService.createBlog({
    //             name: createString(10),
    //             description: createString(10),
    //             websiteUrl: createString(10)});
    //
    //         expect(response).toBe(createBlogData.id)
    //     });
    // });
})