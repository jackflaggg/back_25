export const secretErrorCheck = (key: string | undefined): boolean => {
    const isInvalid = !key || key.trim().length === 0;
    if (isInvalid) {
        console.error('SECRET_KEY не установлен или не валиден');
    }
    return !isInvalid;
}