import {emailInfo} from "../user/ouput/output.type.users";

export interface BlogDbType {
    id?:            string,
    name:           string,
    description:    string,
    websiteUrl:     string
    createdAt:      string,
    isMembership:   boolean
}

export interface PostDbType {
    title:              string,
    shortDescription:   string,
    content:            string,
    blogId:             string,
    blogName:           string,
    createdAt:          string
}

export interface UserDbType {
    id?:                    string,
    login:                  string,
    password:               string,
    email:                  string,
    createdAt:              string,
    emailConfirmation:      emailInfo
}

export interface CommentatorInfo {
    userId:         string;
    userLogin:      string;
}

export interface CommentDbType {
    id?:                string;
    content:            string;
    commentatorInfo:    CommentatorInfo;
    createdAt:          string;
    postId:             string;
}

export interface RefreshTokenType {
    refreshToken:   string
}

export interface SessionCollection {
    issuedAt:           string;           // exp refresh token
    deviceId:           string;           // UUID
    userId:             string
    ip:                 string;           // req.ip
    lastActiveDate:     string;           // iat
    deviceName:         string;          // user.agent
    refreshToken:      string;
}
