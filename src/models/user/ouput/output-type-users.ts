import {ObjectId} from "mongodb";

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

export interface OutUserServiceModel {
    login: string,
    password: string,
    email: string,
    createdAt: string,
}

export interface OutUserFindLoginOrEmail {
    _id?: ObjectId,
    login: string,
    email: string,
    password?: string,
    createdAt: string
}



