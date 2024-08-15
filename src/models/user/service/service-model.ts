import {OutputBlogModel} from "../../blog/output/output-type-blogs";


export type NewBlogModel = Omit<OutputBlogModel, 'id'>;