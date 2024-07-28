import {Router} from "express";
import {AllBlogController} from "../../controllers/blogs/GetAllBlogs";
import {OneBlogController} from "../../controllers/blogs/GetOneBlog";
import {createBlogController} from "../../controllers/blogs/CreateBlog";
import {updateBlogController} from "../../controllers/blogs/UpdateBlog";
import {deleteBlogController} from "../../controllers/blogs/DelBlogId";
import {adminMiddlewares} from "../../utils/middlewares/admin-middleware";
import {/*blogIdParamsValidator, */blogValidator} from "../../validators/blogValidator";
import {getAllPostsToBlogID} from "../../controllers/blogs/GetAllPostsToBlogID";
import {blogIdParamsValidator, postCreateWithBlogIdValidator, postValidator} from "../../validators/postValidator";
import {createNewPostToBlogID} from "../../controllers/blogs/CreateNewPostToBlogID";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/checkErrorsValidator";

export const blogsRouter: Router = Router();

blogsRouter.get("/", AllBlogController);
blogsRouter.get("/:id", blogIdParamsValidator, inputCheckErrorsMiddleware, OneBlogController);
blogsRouter.get("/:id/posts", getAllPostsToBlogID);

blogsRouter.post("/", adminMiddlewares, ...blogValidator, createBlogController);
blogsRouter.post("/:id/posts", adminMiddlewares, ...postCreateWithBlogIdValidator, createNewPostToBlogID);

blogsRouter.put("/:id", adminMiddlewares, blogIdParamsValidator,...blogValidator, updateBlogController);
blogsRouter.delete("/:id", adminMiddlewares, blogIdParamsValidator, deleteBlogController);
