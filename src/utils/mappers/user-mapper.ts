import {OutCreateUserModel, OutUserServiceModel} from "../../models/user/ouput/output-type-users";
import {randomUUID} from "node:crypto";
import {add} from "date-fns/add";


export const userMapper = (user: any): OutCreateUserModel=> {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
        emailConfirmation?: {
            confirmationCode: randomUUID(),
            expirationDate: add(new Date(), {hours: 1,minutes: 30}).toISOString(),
            isConfirmed: false,
        }
    }
}

export const userMapperToCreate = (login: string, email: string, password: string): OutUserServiceModel => {
    return {
        login,
        email,
        password,
        createdAt: new Date().toISOString(),
        emailConfirmation?: {
            confirmationCode: randomUUID(),
            expirationDate: add(new Date(), {hours: 1,minutes: 30}).toISOString(),
            isConfirmed: false,
        }
    }
}