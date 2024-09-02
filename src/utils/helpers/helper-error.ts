import {ErrorsMessageResponse, ErrorsType} from "../../models/common/errors/errors-type";

export const helperError = (error: ErrorsMessageResponse) => {
    return error.errorsMessages[0] || error.errorsMessages[1];
}