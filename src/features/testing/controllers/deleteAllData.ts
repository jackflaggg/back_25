import {testingRepositories} from "../../../repositories/testing-repositories";
import {HTTP_STATUSES} from "../../../types/types";
import {Request, Response} from "express";

export const deleteAllData = (req: Request, res: Response) => {
    testingRepositories.delAllRepositories()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}