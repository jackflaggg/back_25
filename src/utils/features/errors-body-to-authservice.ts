export const errorsBodyToAuthService = (body: {login: string, password: string, email: string}): string | null => {
    for (const [key, value] of Object.entries(body)) {
        if (!value) {
            return key;
        }
    }
    return null;
}