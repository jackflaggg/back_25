import {SortDirection} from "mongodb";

export type InQueryUserModel = {
    sortBy?: string,
    sortDirection?: SortDirection,
    pageNumber?: number,
    pageSize?: number,
    searchLoginTerm?: string,
    searchEmailTerm?: string,
}