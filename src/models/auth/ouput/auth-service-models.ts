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