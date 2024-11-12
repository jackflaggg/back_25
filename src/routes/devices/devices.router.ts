import {Router} from "express";
import {verifyTokenInCookieMiddleware} from "../../utils/middlewares/verify.token.in.cookie.middleware";
import {getAllDevicesController} from "../../controllers/devices/get.all.active.sessions.controller";
import {deleteSessionController} from "../../controllers/devices/delete.session.controller";

export const devicesRouter: Router = Router();

devicesRouter.get("/devices", verifyTokenInCookieMiddleware, getAllDevicesController)
devicesRouter.delete("/devices", verifyTokenInCookieMiddleware)
devicesRouter.delete("/devices/:deviceId", verifyTokenInCookieMiddleware, deleteSessionController)
