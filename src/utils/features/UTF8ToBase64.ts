export const fromUTF8ToBase64 = (code: string) => {
    const buffTwo = Buffer.from(code, 'utf8')
    return buffTwo.toString('base64')
}

export const fromHexToBase64 = (code: string) => {
    const buffTwo = Buffer.from(code, 'hex')
    return buffTwo.toString('base64')
}