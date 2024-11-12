import {ErrorsType} from "../../models/common/errors/errors.type";

export const helperError = (error: ErrorsType) => {
    return error.errorsMessages[0] || error.errorsMessages[1];
}