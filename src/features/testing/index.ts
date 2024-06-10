import {Router} from "express";
import {db} from "../../db/db";
import {HTTP_STATUSES} from "../../types/types";

export const testingRouter = Router();

testingRouter.delete('/all-data', (req, res) => {
    db.posts.length = 0;
    db.blogs.length = 0;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})