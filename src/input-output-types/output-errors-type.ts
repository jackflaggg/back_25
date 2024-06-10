import {BlogInputModel} from "./blogs-types";
import {PostInputModel} from "./posts-types";

export type ErrorsMessageType = {
    field: string,
    message: string | FieldNamesType
}
export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel

export type ErrorsType = {
    errorsMessages: ErrorsMessageType[]
}