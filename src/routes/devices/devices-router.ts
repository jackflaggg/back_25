import {Router} from "express";
import {verifyTokenInCookie} from "../../utils/middlewares/verifyTokenInCookie";
import {getAllActiveSessionsController} from "../../controllers/devices/get-all-active-sessions-controller";

export const devicesRouter = Router();

devicesRouter.get("/devices", verifyTokenInCookie, getAllActiveSessionsController)
devicesRouter.delete("/devices", verifyTokenInCookie)
devicesRouter.delete("/devices/:deviceId", verifyTokenInCookie)
