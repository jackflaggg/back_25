import {OutputBlogModel} from "../output/output-type-blogs";

export type NewBlogModel = Omit<OutputBlogModel, 'id'>;