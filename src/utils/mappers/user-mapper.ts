import {OutUserById} from "../../models/user/ouput/output-type-users";

export const userMapperToOutput = (user: any)=> {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
    }
}

export const loginUserMapper = (user: OutUserById) => {
    return {
        email: user.email,
        login: user.login,
        userId: user.id
    }
}