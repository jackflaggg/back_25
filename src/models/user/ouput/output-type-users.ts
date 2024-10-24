import {ObjectId} from "mongodb";
import {UUID} from "node:crypto";

export interface OutCreateUserModel {
    id: string,
    login: string,
    email: string,
    createdAt: string,
}

export interface OutLoginMapByUser {
    login: string,
    email: string,
    userId: string
}

export interface OutUserById {
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
    confirmationCode: UUID | null,
    expirationDate: Date | null,
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



