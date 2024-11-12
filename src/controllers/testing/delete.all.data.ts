import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common.types";
import {testingDbRepositories} from "../../repositories/testing/testing.db.repository";

export const deleteTestingRouter = async (req: Request,
                                   res: Response) => {
    await testingDbRepositories.deleteAllData()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    //return;
}