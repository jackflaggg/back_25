import {Router} from "express";
import {deleteTestingRouter} from "../../controllers/testing/delete.all.data";

export const testingRouter = Router();

testingRouter.delete('/all-data', deleteTestingRouter)