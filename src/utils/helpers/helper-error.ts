import {ErrorsType} from "../../models/common/common-types";

export const helperError = (error: ErrorsType) : ErrorsType => {
    return {errorsMessages: [error.errorsMessages[0]]}
}