import {SortDirection} from "mongodb";

export interface InQueryPostModel {
    sortBy?: string,
    sortDirection?: SortDirection,
    pageNumber?: number,
    pageSize?: number,
}

export interface InUpdatePostModel {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

export interface InCreatePostModel {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export interface InCreatePostToBlogInputModel {
    title: string,
    shortDescription: string,
    content: string
}