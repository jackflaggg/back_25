import {Router} from "express";
import {SETTINGS} from "../../settings";
import {deleteAllData} from "./controllers/deleteAllData";

export const testingRouter = Router();

testingRouter.delete(SETTINGS.PATH.TESTING, deleteAllData)