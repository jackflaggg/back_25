import {Router} from "express";
import {getAllDevicesController} from "../../controllers/devices/get.all.active.sessions.controller";
import {deleteSessionController} from "../../controllers/devices/delete.session.controller";
import {deleteAllSessionsController} from "../../controllers/devices/delete.all.session.but.cur.controller";
import {verifyTokenInCookieMiddleware} from "../../utils/middlewares/verify.token.in.cookie.middleware";

export const devicesRouter: Router = Router();

devicesRouter.get("/devices", verifyTokenInCookieMiddleware, getAllDevicesController)
devicesRouter.delete("/devices", verifyTokenInCookieMiddleware, deleteAllSessionsController)
devicesRouter.delete("/devices/:id", verifyTokenInCookieMiddleware, deleteSessionController)
