import {FieldNamesType} from "../../common/errors/errors.type";

export class OutCreateUserSuccess {
    constructor(public status: string, public data: string) {}
}

export class OutCreateUserError {
    constructor(
        public status: string,
        public extensions: {message: string | FieldNamesType, field: string},
        public data: null) {}
}