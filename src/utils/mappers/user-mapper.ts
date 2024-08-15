import {OutCreateUserModel, OutUserServiceModel} from "../../models/user/ouput/output-type-users";


export const userMapper = (user: any): OutCreateUserModel=> {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
    }
}

export const userMapperToCreate = (login: string, email: string, password: string): OutUserServiceModel => {
    return {
        login,
        email,
        password,
        createdAt: new Date().toISOString()
    }
}