import {SortDirection} from "mongodb";

export type queryParamsName = string | null;

export interface InCreateBlogModel {
    name: string
    description: string
    websiteUrl: string
}

export interface InCreatePostToBlogInputModel {
    title: string,
    shortDescription: string,
    content: string
}

export interface InQueryBlogModel  {
    searchNameTerm?: queryParamsName,
    sortBy?: string,
    sortDirection?: SortDirection,
    pageNumber?: number,
    pageSize?: number,
}

export interface InUpdateBlogModel {
    name: string
    description: string
    websiteUrl: string
}

export interface InCreatePostToBlogModel {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,
}

export interface InCreateToBlogModel {
    id: string,
    name: string,
}