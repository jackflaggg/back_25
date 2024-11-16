type errorsResponse = {
    field: string,
    message: string,
}
export interface ViewModel {
    status: string,
    extensions?: errorsResponse,
    data: null | any
}

export interface loginSuccess {
    status: string,
    data: string
}

export class ErrorAuth extends Error implements ViewModel {
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