import {Request, Response} from "express";

export type RequestWithBody<B> = Request<{}, {}, B>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;
export type RequestWithParams<T> = Request<T>
export type RequestWithQuery<Q> = Request<{}, {}, Q>
export type RequestWithParamsAndQuery<T, Q> = Request<T, Q>

export type ResponseBody<B> = Response<B>

export type BlogParamsModel = {
    id: string
}

export type BlogParamsToPostModel = {
    postId: string
}

export type PostParamsId = {
    id: string
}