import {SortDirection} from "mongodb";

export interface QueryHelperPost {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
}