import {ErrorsType} from "../../models/common/errors/errors-type";

export const helperError = (error: ErrorsType) : ErrorsType => {
    return {errorsMessages: [error.errorsMessages[0]]}
}