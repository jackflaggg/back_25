export interface OutBlogModel {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}


export interface OutGetAllBlogsModel {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: OutBlogModel[],
}

