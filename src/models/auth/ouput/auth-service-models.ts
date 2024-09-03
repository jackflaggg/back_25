import {ErrorsMessageToResponseType} from "../../common/errors/errors-type";
import {ObjectId} from "mongodb";

export interface authenticationUserToLoginError {
    status: string,
    extensions?: ErrorsMessageToResponseType,
    data: null
}

export interface authenticationUserToLogin {
    status: string,
    data: string | ObjectId
}