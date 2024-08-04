import {Request, Response} from "express";
import {OutputBlogModel} from "../blog/output/blog.output.models";
import {OutputPostModel} from "../post/output/post.output.models";

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_AUTHORIZATION = 401,
    NOT_FOUND_404 = 404,

    INTERNAL_SERVER_ERROR_500 = 500,
}

export type ErrorsMessageType = {
    message: string | FieldNamesType,
    field: string
}
export type FieldNamesType = keyof OutputBlogModel | keyof OutputPostModel

export type ErrorsType = {
    errorsMessages: ErrorsMessageType[]
}
export enum ResultStatus {
    Success = 'Success',
    BadRequest = 'BadRequest',
    Unauthorized = 'Unauthorized',
    Forbidden = 'Forbidden',
    NotFound = 'NotFound'
}

export type Result<T = null> = {
    status: ResultStatus,
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

export interface Paginator<T> {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: T
}

