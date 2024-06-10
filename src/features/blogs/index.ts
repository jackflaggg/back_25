import {Router} from "express";
import {AllBlogController} from "./controllers/getAllBlogs";
import {OneBlogController} from "./controllers/getOneBlog";
import {createBlogController} from "./controllers/CreateBlog";
import {updateBlogController} from "./controllers/UpdateBlog";
import {deleteBlogController} from "./controllers/DelBlogId";
import {adminMiddlewares} from "../global-middlewares/admin-middleware";

export const blogsRouter: Router = Router();

blogsRouter.get("/", AllBlogController);
blogsRouter.get("/:id", OneBlogController);
blogsRouter.post("/", createBlogController);
blogsRouter.put("/:id", updateBlogController);
blogsRouter.delete("/:id", adminMiddlewares, deleteBlogController);
