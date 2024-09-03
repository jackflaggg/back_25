import {ErrorsMessageToResponseType, ResultStatus} from "../../common/errors/errors-type";
import {ObjectId} from "mongodb";

export interface authenticationUserToLogin {
    status: string,
    extensions?: ErrorsMessageToResponseType,
    data: ObjectId | null
}