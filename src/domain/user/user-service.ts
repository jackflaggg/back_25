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