import {OutBlogModel} from "../../blog/output/output.type.blogs";


export type NewBlogModel = Omit<OutBlogModel, 'id'>;