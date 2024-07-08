import {testVercelRouter} from "../../controllers/vercel/getVersion";
import {Router} from "express";

export const vercelRouter = Router()
vercelRouter.get('/', testVercelRouter);