import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {blogsRouter} from "./features/blogs";

export const app = express();
app.use(express.json())
app.use(cors())

app.use(SETTINGS.PATH.BLOGS, blogsRouter);