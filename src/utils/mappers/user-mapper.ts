import {CreateUserOutputModel} from "../../models/user/ouput/CreateViewModelUserOutput";
import {
    CreateMapperUserOutputModel,
} from "../../models/user/input/CreateServiceModelUser";

export const userMapper = (user: any): CreateUserOutputModel => {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
    }
}

export const userMapperToCreate = (login: string, email: string, password: string): CreateMapperUserOutputModel => {
    return {
        login,
        email,
        password,
        createdAt: new Date().toISOString()
    }
}