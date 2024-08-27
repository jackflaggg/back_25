export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_AUTHORIZATION_401 = 401,
    NOT_FORBIDDEN_403 = 403,
    NOT_FOUND_404 = 404,

    INTERNAL_SERVER_ERROR_500 = 500,
}

export type AccessToken = {
    accessToken: string
}

export type AsyncVoid = Promise<void>

