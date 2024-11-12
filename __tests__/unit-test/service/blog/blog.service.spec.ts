import {ObjectId} from "mongodb";
import {createString} from "../../../helpers-e2e/datatests";
import {blogsRepositories} from "../../../../src/repositories/blogs/blogs.db.repository";
import {blogsService} from "../../../../src/domain/blog/blog.service";

jest.mock('../../../../src/repositories/blogs/blogs.db.repository', () => ({
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

describe('blogsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createBlog', () => {
        it('✅ создание блога', async() => {
            (blogsRepositories.createBlog as jest.Mock).mockResolvedValueOnce(createBlogData.id);

            const response = await blogsService.createBlog({
                name: createString(10),
                description: createString(10),
                websiteUrl: createString(10)});

            expect(response).toBe(createBlogData.id)
        });

        it('⛔ null при создании', async() => {
            (blogsRepositories.createBlog as jest.Mock).mockResolvedValueOnce(null);

            const response = await blogsService.createBlog({
                name: createString(10),
                description: createString(10),
                websiteUrl: createString(10)
            });

            expect(response).toBe(null)
        });
    });

    describe('createPostToBlogInputModel', () => {
        it('✅ создание поста для блога', async() => {
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

        it('⛔ null при создании поста для блога', async() => {

            (blogsRepositories.createPostToBlogID as jest.Mock).mockResolvedValueOnce(null);

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

            expect(response).toBe(null)
        });
    });

    describe('putBlog', () => {
        it('✅ обновление блога', async() => {

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

        it('⛔ false при обнове', async() => {

            const updateBlog = {
                id: new ObjectId().toString(),
                name: createString(11),
                description: createString(11),
                websiteUrl: createString(11),
            };

            const {id, ...blogUpdate} = updateBlog;

            (blogsRepositories.putBlog as jest.Mock).mockResolvedValueOnce(false);

            const response = await blogsService.putBlog(updateBlog.id, blogUpdate);

            expect(response).toBe(false)
        });
    });

    describe('delBlog', () => {
        it('✅ удаление блога', async() => {

            (blogsRepositories.delBlog as jest.Mock).mockResolvedValueOnce(true);

            const response = await blogsService.delBlog(createBlogData.id);

            expect(response).toBe(true)
        });

        it('⛔ false при удаление блога', async() => {

            (blogsRepositories.delBlog as jest.Mock).mockResolvedValueOnce(false);

            const response = await blogsService.delBlog(createBlogData.id);

            expect(response).toBe(false)
        });
    });
})