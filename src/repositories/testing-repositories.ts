import {db} from "../db/db";

export const testingRepositories = {
    delAllRepositories(){
        db.posts.length = 0;
        db.blogs.length = 0;
        return;
    }
}