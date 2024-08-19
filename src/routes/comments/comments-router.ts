import {Router} from "express";
import {getCommentIdController} from "../../controllers/comments/GetCommentId";
import {updateCommentController} from "../../controllers/comments/UpdateCommentId";
import {deleteCommentController} from "../../controllers/comments/DeleteCommentId";
import {authBearerMiddlewares} from "../../utils/middlewares/auth-bearer-middleware";
import {contentValidator} from "../../validators/commentValidator";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/checkErrorsValidator";

export const commentsRouter = Router();

commentsRouter.get("/:id", getCommentIdController)
commentsRouter.put("/:commentId", authBearerMiddlewares, contentValidator, inputCheckErrorsMiddleware, updateCommentController)
commentsRouter.delete("/:commentId", authBearerMiddlewares, deleteCommentController)