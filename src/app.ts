import express, {Express} from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {blogsRouter} from "./routes/blogs/blogs-router";
import {postRouter} from "./routes/posts/posts-router";
import {testingRouter} from "./routes/testing/testing-routes";
import {vercelRouter} from "./routes/vercel/vercel-router";
import {userRouter} from "./routes/users/users-routes";
import {authRouter} from "./routes/auth/auth-router";
import {commentsRouter} from "./routes/comments/comments-router";
import cookieParser from "cookie-parser";

export const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use(SETTINGS.PATH.VERCEL, vercelRouter);

app.use(SETTINGS.PATH.TESTING, testingRouter);
app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postRouter);
app.use(SETTINGS.PATH.USERS, userRouter);
app.use(SETTINGS.PATH.AUTH, authRouter);
app.use(SETTINGS.PATH.COMMENTS, commentsRouter);
