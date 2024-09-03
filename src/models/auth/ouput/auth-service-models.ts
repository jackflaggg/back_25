import {ErrorsMessageToResponseType} from "../../common/errors/errors-type";

export interface loginError {
    status: string,
    extensions?: ErrorsMessageToResponseType,
    data: null
}

export interface loginSuccess {
    status: string,
    data: string
}