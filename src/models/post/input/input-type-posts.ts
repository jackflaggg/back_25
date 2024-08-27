import {SortDirection} from "mongodb";

export type InQueryPostModel = {
    sortBy?: string,
    sortDirection?: SortDirection,
    pageNumber?: number,
    pageSize?: number,
}

export type InUpdatePostModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export interface InCreatePostModel {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}