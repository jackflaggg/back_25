import {Router} from "express";
import {adminMiddlewares} from "../global-middlewares/admin-middleware";
import {createPostController} from "./controllers/CreatePost";
import {AllPostController} from "./controllers/getAllPosts";
import {OnePostController} from "./controllers/getOnePost";
import {updatePostController} from "./controllers/UpdatePost";
import {deletePostController} from "./controllers/DelPost";

export const postRouter: Router = Router();

postRouter.get("/", AllPostController);
postRouter.get("/:id", OnePostController);
postRouter.post("/", createPostController);
postRouter.put("/:id", updatePostController);
postRouter.delete("/:id", adminMiddlewares, deletePostController);
