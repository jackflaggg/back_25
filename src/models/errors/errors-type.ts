import {OutBlogModel} from "../blog/output/output-type-blogs";
import {OutPostModel} from "../post/output/output-type-posts";

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
    NotContent: 'NotContent',
} as const;

export const ResultSuccess = {
    Success: 'Success'
}

export type ResultStatusType = typeof ResultStatus[keyof typeof ResultStatus];

export type ResultError = {
    status: string
    data: ErrorsType
}
