import { UsersDbRepository } from '../../../src/repositories/users/users-db-repository';
import { authService } from '../../../src/domain/auth/auth-service';
import { ResultStatus, ResultSuccess } from '../../../src/models/common/errors/errors-type';
import { hashService } from '../../../src/utils/application/hash-service';
import {ObjectId} from "mongodb";
import {createString} from "../../helpers-e2e/datatests";
import {jwtService} from "../../../src/utils/application/jwt-service";
import {postsRepository} from "../../../src/repositories/posts/posts-db-repository";
import {postsService} from "../../../src/domain/post/post-service";

jest.mock('../../../src/repositories/posts/posts-db-repository', () => ({
    postsRepository: {
        createPost: jest.fn(),
        putPost: jest.fn(),
        delPost: jest.fn(),
    },
}));

let realBlog = {
    id: new ObjectId().toString(),
    name: createString(10),
}

let realPost = {
    title: createString(10),
    shortDescription: createString(10),
    content: createString(10),
    blogId: realBlog.id,
    blogName: realBlog.name,
}

describe('postsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createPost', () => {
        it('⛔ возвращает ошибку, если Некорректный объект, Серверная ошибка, Ошибка при вставке', async () => {
            (postsRepository.createPost as jest.Mock).mockResolvedValue(null);

            const {blogName, ...mutatePost} = realPost;
            const existingPost = {
                ...mutatePost,
                createdAt: new Date().toISOString(),
            }

            const response = await postsService.createPost(
                existingPost,
                realBlog.name)

            expect(response).toBeNull()
        });
    });
});
