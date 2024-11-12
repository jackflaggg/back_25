import {testVercelRouter} from "../../controllers/vercel/get.version.app";
import {Router} from "express";

export const vercelRouter = Router()
vercelRouter.get('/', testVercelRouter);