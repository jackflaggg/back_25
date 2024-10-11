import {ResultStatus} from "../../models/common/errors/errors-type";

export const errorsBodyToAuthService = (body: any) => {
    for (const [key, value] of Object.entries(body)) {
        if (!value) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: `${key} is required`, field: `${key}`},
                data: null
            }
        }
    }
    return;
}