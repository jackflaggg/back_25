import {ObjectId} from "mongodb";
import {randomUUID} from "node:crypto";
import {UUID} from "crypto";

export interface OutCreateUserModel {
    id: string,
    login: string,
    email: string,
    createdAt: string,
}

export interface OutQueryCreateUsersModel {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: OutCreateUserModel[]
}

export interface emailInfo {
    confirmationCode: UUID,
    expirationDate: string,
    isConfirmed: boolean
}

export interface OutUserServiceModel {
    login: string,
    password: string,
    email: string,
    createdAt: string,
    emailConfirmation: emailInfo
}

export interface OutUserFindLoginOrEmail {
    _id?: ObjectId,
    login: string,
    email: string,
    password?: string,
    createdAt: string
}



