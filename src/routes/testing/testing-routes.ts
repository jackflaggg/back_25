import {Router} from "express";
import {deleteTestingRouter} from "../../controllers/testing/deleteAllData";

export const testingRouter = Router();

testingRouter.delete('/all-data', deleteTestingRouter)