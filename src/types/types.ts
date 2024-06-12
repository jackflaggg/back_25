import {Request, Response} from "express";

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_AUTHORIZATION = 401,
    NOT_FOUND_404 = 404,

    INTERNAL_SERVER_ERROR_500 = 500,
}

export type BlogDbType = {
    id: string
    name: string
    description: string
    websiteUrl: string
}

export type PostDbType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    blogs: BlogDbType[]
    posts: PostDbType[]
}

export type RequestWithBody<B> = Request<{}, {}, B>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;
export type RequestWithParams<T> = Request<T>
export type ResponseBody<B> = Response<B>

export type BlogParamsModel = {
    id: string
}

export type PostParamsId = {
    id: string
}
