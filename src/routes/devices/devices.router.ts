import {Router} from "express";
import {getAllDevicesController} from "../../controllers/devices/get.all.active.sessions.controller";
import {deleteSessionController} from "../../controllers/devices/delete.session.controller";
import {deleteAllSessionsController} from "../../controllers/devices/delete.all.session.but.cur.controller";

export const devicesRouter: Router = Router();

devicesRouter.get("/devices",getAllDevicesController)
devicesRouter.delete("/devices", deleteAllSessionsController)
devicesRouter.delete("/devices/:id", deleteSessionController)
