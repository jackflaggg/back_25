export interface OutputBlogModel {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}


export interface OutGetAllBlogs {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: OutputBlogModel[],
}