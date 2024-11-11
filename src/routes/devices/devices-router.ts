import {Router} from "express";
import {verifyTokenInCookie} from "../../utils/middlewares/verifyTokenInCookie";
import {getAllDevicesController} from "../../controllers/devices/get-all-active-sessions-controller";

export const devicesRouter: Router = Router();

devicesRouter.get("/devices", verifyTokenInCookie, getAllDevicesController)
devicesRouter.delete("/devices", verifyTokenInCookie)
devicesRouter.delete("/devices/:deviceId", verifyTokenInCookie)
