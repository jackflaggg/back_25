import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {blogsRouter} from "./routes/blogs/blogs-router";
import {postRouter} from "./routes/posts/posts-router";
import {testingRouter} from "./routes/testing/testing-routes";

export const app = express();
app.use(express.json())
app.use(cors())

app.use(SETTINGS.PATH.TESTING, testingRouter);

app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postRouter);
