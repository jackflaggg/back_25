import {OutBlogModel} from "../../blog/output/output.type.blogs";
import {OutPostModel} from "../../post/output/output.type.posts";

export type ErrorsMessageType = {
    field: string,
    message: string | FieldNamesType
}

export type ErrorsMessageToResponseType = {
    message: string,
    field: string
}
export type FieldNamesType = keyof OutBlogModel | keyof OutPostModel

export type ErrorsType = {
    errorsMessages: ErrorsMessageType[]
}
export type ErrorsMessageResponse = {
    errorsMessages: ErrorsMessageToResponseType[];
};

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
