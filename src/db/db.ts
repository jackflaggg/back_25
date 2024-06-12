import {DBType} from "../types/types";
import {blogOne} from "./blogs-db";
import {postOne} from "./posts-db";
import {ErrorsType} from "../input-output-types/output-errors-type";

export const db: DBType = {
    blogs: [],
    posts: [],
}

export const errors: ErrorsType = {
    errorsMessages: []
}