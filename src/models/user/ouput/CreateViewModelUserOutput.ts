import {ObjectId} from "mongodb";

export interface CreateUserOutputModel {
    id: string,
    login: string,
    email: string,
    createdAt: string,
}

export interface UserServiceOutputModel {
    login: string,
    password: string,
    email: string,
    createdAt: string,
}

export interface UserFindLoginOrEmailOutputRepository {
    _id?: ObjectId,
    login: string,
    password: string,
    email: string,
    createdAt: string
}

export type UserDbType = {
    _id: ObjectId;
    login: string;
    password: string;
    email: string;
    createdAt: string;
    // любые другие поля, которые могут быть в базе данных
};