import {CreateOutputModel} from "../../models/user/ouput/CreateViewModelUserOutput";

export const userMapper = (user: any): CreateOutputModel => {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
    }
}