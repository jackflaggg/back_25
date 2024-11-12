import {ErrorsMessageResponse, ErrorsMessageToResponseType} from "../../models/common/errors/errors.type";

export const errorsMessages = (errorData: ErrorsMessageToResponseType): ErrorsMessageResponse => {
    return {errorsMessages: [errorData]}
}