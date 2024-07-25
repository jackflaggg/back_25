import {PostCreateType, PostUpdateType} from "../../models/db/db.models";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {postsRepository} from "../../repositories/posts/posts-db-repository";
import {InputUpdatePostModel} from "../../models/post/input/update.post.input.models";
import {UsersDbRepository} from "../../repositories/users/users-db-repository";

export const userService = {
    async createUser(user: any): Promise<string | null> {
        const { login, password, email} = user;

        const newUser: any = {
            login,
            password,
            email
        }
        return await UsersDbRepository.createUser(newUser);
    },
    async delUser(id: string): Promise<boolean> {
        return await UsersDbRepository.deleteUser(id);
    }
}