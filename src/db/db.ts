import {DBType} from "../types/types";
import {blogOne} from "./blogs-db";
import {postOne} from "./posts-db";
import {ErrorsType} from "../input-output-types/output-errors-type";

export const db: DBType = {
    blogs: [blogOne],
    posts: [postOne],
}

export const errors: ErrorsType = {
    errorsMessages: []
}