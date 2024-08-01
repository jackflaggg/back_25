// инициализация типов при создании данных (блогов, постов, бд)

export interface BlogDbType {
    id?: string,
    name: string,
    description: string,
    websiteUrl: string
    createdAt: string,
    isMembership: boolean
}

export interface PostDbType {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export interface UserDbType {
    id?: string,
    login: string,
    password?: string,
    email: string,
    createdAt: string,
}

export interface CommentatorInfo {
    userId: string;
    userLogin: string;
}

export interface CommentDbType {
    id?: string;
    content: string;
    commentatorInfo: CommentatorInfo; // Используем новый интерфейс
    createdAt: string;
}


export interface BlogCreateType {
    name: string,
    description: string,
    websiteUrl: string
    createdAt: string,
    isMembership: boolean
}

export interface PostCreateType {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export interface PostUpdateType {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
}