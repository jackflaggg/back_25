import {OutBlogModel} from "../output/output.type.blogs";

export type NewBlogModel = Omit<OutBlogModel, 'id'>;