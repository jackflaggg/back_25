export interface CreateUserServiceModel {
    login: string,
    password: string,
    email: string
}

export interface CreateMapperUser{
    login: string,
    email: string,
   // password: string,
    createdAt: string
}

export interface CreateMapperUserOutputModel {
    login: string,
    email: string,
    password: string,
    createdAt: string
}