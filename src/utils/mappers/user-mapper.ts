import {CreateUserOutputModel} from "../../models/user/ouput/CreateViewModelUserOutput";

export const userMapper = (user: any): CreateUserOutputModel => {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
    }
}