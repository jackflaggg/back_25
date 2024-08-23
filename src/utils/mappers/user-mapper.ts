import {
    MapperCreateUserModel,
    OutCreateUserModel,
    OutUserServiceModel
} from "../../models/user/ouput/output-type-users";
import {randomUUID} from "node:crypto";
import {add} from "date-fns/add";
import {emailConfirmation} from "../features/emailConfirmation";
import {WithId} from "mongodb";
import {UserDbType} from "../../models/db/db.models";


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
        //emailConfirmation
    }
}

export const loginUserMapper = (user: WithId<UserDbType>) => {
    return {
        email: user.email,
        login: user.login,
        userId: user.id
    }
}