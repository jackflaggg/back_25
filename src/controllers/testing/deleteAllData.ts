import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common-types";
import {testingDbRepositories} from "../../repositories/testing-db-repository";

export const deleteTestingRouter = async (req: Request,
                                   res: Response) => {
    await testingDbRepositories.deleteAllData()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}