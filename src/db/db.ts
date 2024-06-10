import {DBType} from "../types/types";
import {blogOne} from "./blogs-db";
import {postOne} from "./posts-db";

export const db: DBType = {
    blogs: [blogOne],
    posts: [postOne],
}