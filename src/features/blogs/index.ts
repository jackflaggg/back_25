import {Router} from "express";
import {AllBlogController} from "./controllers/getAllBlogs";
import {OneBlogController} from "./controllers/getOneBlog";
import {createBlogController} from "./controllers/CreateBlog";
import {updateBlogController} from "./controllers/UpdateBlog";
import {deleteBlogController} from "./controllers/DelBlogId";
import {adminMiddlewares} from "../global-middlewares/admin-middleware";
import {blogValidator, findBlogValidator} from "./middlewares/blogValidator";

export const blogsRouter: Router = Router();

blogsRouter.get("/", AllBlogController);
blogsRouter.get("/:id", findBlogValidator, OneBlogController);
blogsRouter.post("/", ...blogValidator, createBlogController);
blogsRouter.put("/:id", updateBlogController, findBlogValidator, ...blogValidator, updateBlogController);
blogsRouter.delete("/:id", adminMiddlewares, findBlogValidator, deleteBlogController);
