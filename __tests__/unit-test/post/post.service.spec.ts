import {postsRepository} from "../../../src/repositories/posts/posts-db-repository";
import {postsService} from "../../../src/domain/post/post-service";
import {postsQueryRepository} from "../../../src/repositories/posts/posts-query-repository";
import {usersQueryRepository} from "../../../src/repositories/users/users-query-repository";
import {ResultStatus} from "../../../src/models/common/errors/errors-type";
import {CommentsDbRepository} from "../../../src/repositories/comments/comments-db-repository";
import {createBlog, createPostDbType, createPostToCreate, createUserById} from "../helper-unit/post.service.helper";

jest.mock('../../../src/repositories/posts/posts-db-repository', () => ({
    postsRepository: {
        createPost: jest.fn(),
        putPost: jest.fn(),
        delPost: jest.fn(),
    },
}));

jest.mock('../../../src/repositories/posts/posts-query-repository', () => ({
    postsQueryRepository: {
        giveOneToIdPost: jest.fn(),
    }
}));

jest.mock('../../../src/repositories/users/users-query-repository', () => ({
    usersQueryRepository: {
        getUserById: jest.fn(),
    }
}));

jest.mock('../../../src/repositories/comments/comments-db-repository', () => ({
    CommentsDbRepository: {
        CreateComment: jest.fn(),
    }
}));

describe('postsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createPost', () => {
        it('⛔ возвращает ошибку, если Некорректный объект, Серверная ошибка, Ошибка при вставке', async () => {
            const blog = createBlog();

            const postToCreate = createPostToCreate(blog.id);

            (postsRepository.createPost as jest.Mock).mockResolvedValue(null);

            const response = await postsService.createPost(
                postToCreate,
                blog.name);

            expect(response).toBeNull()
        });

        it('✅ возвращает id при успехе', async () => {
            const blog = createBlog();

            const postToCreate = createPostDbType(blog.id);

            (postsRepository.createPost as jest.Mock).mockResolvedValue(postToCreate.id);

            const response = await postsService.createPost(
                postToCreate,
                blog.name)

            expect(response).toEqual(postToCreate.id)
        });
    });

    describe('putPost', () => {
        it('⛔ возвращает false, если не удалось обновить', async () => {
            const blog = createBlog();

            const postExisting = createPostToCreate(blog.id);

            const postToCreate = createPostDbType(blog.id);

            (postsRepository.putPost as jest.Mock).mockResolvedValue(false);

            const response = await postsService.putPost(
                postExisting,
                blog.name,
                postToCreate.id)

            expect(response).toBeFalsy()
        });

        it('✅ возвращает true, если успех', async () => {
            const blog = createBlog();

            const postExisting = createPostToCreate(blog.id);

            const postToCreate = createPostDbType(blog.id);

            (postsRepository.putPost as jest.Mock).mockResolvedValue(true);

            const response = await postsService.putPost(
                postExisting,
                blog.name,
                postToCreate.id);

            expect(response).toBeTruthy()
        });
     });

    describe('delPost', () => {
        it('⛔ возвращает false, если не удалось обновить', async () => {
            const blog = createBlog();

            const postToCreate = createPostDbType(blog.id);

            (postsRepository.delPost as jest.Mock).mockResolvedValue(false);

            const response = await postsService.delPost(
                postToCreate.id)

            expect(response).toBeFalsy()
        });

        it('✅ возвращает true, если успех', async () => {
            const blog = createBlog();

            const postToCreate = createPostDbType(blog.id);

            (postsRepository.delPost as jest.Mock).mockResolvedValue(true);

            const response = await postsService.delPost(
                postToCreate.id)

            expect(response).toBeTruthy()
        });
    });

    describe('createCommentToPost', () => {
        it('⛔ возвращает null, если не удалось найти юзера', async () => {
            const blog = createBlog();

            const postToCreate = createPostDbType(blog.id);

            const createUser = createUserById();

            (usersQueryRepository.getUserById as jest.Mock).mockResolvedValueOnce(null);

            const response = await postsService.createCommentToPost(postToCreate.id, postToCreate.content, createUser.id)

            expect(response).toEqual({
                status: ResultStatus.NotFound,
                extensions: {message: 'The user not found', field: 'user'},
                data: null
            })
        });

        it('⛔ возвращает null, если не удалось найти пост', async () => {
            const blog = createBlog();

            const postToCreate = createPostDbType(blog.id);

            const createUser = createUserById();

            (usersQueryRepository.getUserById as jest.Mock).mockResolvedValueOnce(createUser.id);

            (postsQueryRepository.giveOneToIdPost as jest.Mock).mockResolvedValueOnce(null);

            const response = await postsService.createCommentToPost(postToCreate.id, postToCreate.content, createUser.id)

            expect(response).toEqual({
                status: ResultStatus.NotFound,
                extensions: {message: 'The post not found', field: 'post'},
                data: null
            })
        });

        it('⛔ возвращает null, если не удалось создать новый комментарий ', async () => {
            const blog = createBlog();

            const postToCreate = createPostDbType(blog.id);

            const createUser = createUserById();

            (usersQueryRepository.getUserById as jest.Mock).mockResolvedValueOnce(createUser.id);

            (postsQueryRepository.giveOneToIdPost as jest.Mock).mockResolvedValueOnce(postToCreate);

            (CommentsDbRepository.CreateComment as jest.Mock).mockResolvedValueOnce(null)

            const response = await postsService.createCommentToPost(postToCreate.id, postToCreate.content, createUser.id)

            expect(response).toEqual({
                status: ResultStatus.NotContent,
                data: null
            })
        });

        it('✅ возвращает true, если успех', async () => {
            const blog = createBlog();

            const postToCreate = createPostDbType(blog.id);

            const createUser = createUserById();

            (usersQueryRepository.getUserById as jest.Mock).mockResolvedValueOnce(createUser.id);

            (postsQueryRepository.giveOneToIdPost as jest.Mock).mockResolvedValueOnce(postToCreate);

            (CommentsDbRepository.CreateComment as jest.Mock).mockResolvedValueOnce(createUser.id)

            const response = await postsService.createCommentToPost(postToCreate.id, postToCreate.content, createUser.id)

            expect(response).toEqual({
                status: ResultStatus.NotContent,
                data: createUser.id
            })
        });
    });
});
