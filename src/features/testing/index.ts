import {Router} from "express";
import {db} from "../../db/db";

export const testingRouter = Router();

testingRouter.delete('/all-data', (req, res) => {
    db.posts.length = 0;
    db.blogs.length = 0;
    res.status(204).json({})
})