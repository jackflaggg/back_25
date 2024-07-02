import {Router} from "express";
import {database} from "../../db/db";
import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common-types";

export const testingRouter = Router();

testingRouter.delete('/all-data', async (req: Request,
                                   res: Response) => {
    await database.dropDatabase({})
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})