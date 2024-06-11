import {BlogInputModel} from "./blogs-types";
import {PostInputModel} from "./posts-types";

export type ErrorsMessageType = {
    message: string | FieldNamesType,
    field: string
}
export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel

export type ErrorsType = {
    errorsMessages: ErrorsMessageType[]
}