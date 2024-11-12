import {SortDirection} from "mongodb";
import {queryParamsName} from "../input/input.type.blogs";

export interface QueryHelperBlog {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchNameTerm: queryParamsName | null
}