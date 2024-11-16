export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_AUTHORIZATION_401 = 401,
    NOT_FORBIDDEN_403 = 403,
    NOT_FOUND_404 = 404,
    TOO_MANY_REQUESTS_429 = 429,
    INTERNAL_SERVER_ERROR_500 = 500,
}

export type AccessToken = {
    accessToken: string
}

export interface VerifiedToken {
    userId: string;
}

export interface TokenVerificationResult {
    expired?: boolean;
    token?: VerifiedToken;
}
