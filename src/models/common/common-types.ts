import {Request, Response} from "express";
import {OutBlogModel} from "../blog/output/output-type-blogs";
import {OutPostModel} from "../post/output/output-type-posts";

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_AUTHORIZATION_401 = 401,
    NOT_FORBIDDEN_403 = 403,
    NOT_FOUND_404 = 404,

    INTERNAL_SERVER_ERROR_500 = 500,
}

export type ErrorsMessageType = {
    message: string | FieldNamesType,
    field: string
}
export type FieldNamesType = keyof OutBlogModel | keyof OutPostModel

export type ErrorsType = {
    errorsMessages: ErrorsMessageType[]
}
export const ResultStatus = {
    BadRequest: 'BadRequest',
    Forbidden: 'Forbidden',
    NotFound: 'NotFound',
    // NotAuthorized: 'NotAuthorized',
    //Success: 'Success',
    NotContent: 'NotContent',
} as const;

export const ResultSuccess = {
    Success: 'Success'
}

export type ResultStatusType = typeof ResultStatus[keyof typeof ResultStatus];

export type Result<T = null> = {
    status: ResultStatusType,
    extensions?: [{ field: string, message: string }],
    data: T
}

export type ResultError = {
    status: string
    data: ErrorsType
}

export type RequestWithBody<B> = Request<{}, {}, B>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;
export type RequestWithParams<T> = Request<T>
export type RequestWithQuery<Q> = Request<{}, {}, Q>
export type RequestWithParamsAndQuery<T, Q> = Request<T, Q>

export type ResponseBody<B> = Response<B>

export type BlogParamsModel = {
    id: string
}

export type PostParamsId = {
    id: string
}

export type AccessToken = {
    accessToken: string
}

export type AsyncVoid = Promise<void>

