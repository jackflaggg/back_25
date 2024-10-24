import {Router} from "express";
import {verifyTokenInCookie} from "../../utils/middlewares/verifyTokenInCookie";

export const devicesRouter = Router();

devicesRouter.get("/devices", verifyTokenInCookie)
devicesRouter.delete("/devices", verifyTokenInCookie)
devicesRouter.delete("/devices/:deviceId", verifyTokenInCookie)
