type errorsResponse = {
    field: string,
    message: string,
}
export interface loginError {
    status: string,
    extensions?: errorsResponse,
    data: null
}

export interface loginSuccess {
    status: string,
    data: string
}

export class LoginErrorTwo extends Error implements loginError {
    status: string;
    extensions?: errorsResponse;
    data: null;
    constructor(status: string, extensions?: { field: string; message: string }) {
        super();
        this.status = status;
        this.extensions = extensions;
        this.data = null
    }
}