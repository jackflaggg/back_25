import {emailConfirmation} from "../features/emailConfirmation";
import {OutUserById} from "../../models/user/ouput/output-type-users";


// export const userMapper = (user: any)=> {
//     return {
//         id: user._id.toString(),
//         login: user.login,
//         email: user.email,
//         createdAt: user.createdAt,
//         emailConfirmation
//     }
// }
//
// export const userMapperToCreate = (login: string, email: string, password: string) => {
//     return {
//         login,
//         email,
//         password,
//         createdAt: new Date().toISOString(),
//         emailConfirmation
//     }
// }

export const userMapToCreateAdmin = (login: string, email: string, password: string) => {
    return {
        login,
        email,
        password
    }
}

export const userMapperToOutput = (user: any)=> {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
        emailConfirmation: emailConfirmation()
    }
}

export const loginUserMapper = (user: OutUserById) => {
    return {
        email: user.email,
        login: user.login,
        userId: user.id
    }
}