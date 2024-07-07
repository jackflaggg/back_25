import {fromUTF8ToBase64} from "../../src/middlewares/admin-middleware";
import {SETTINGS} from "../../src/settings";


export const fromHexToBase64 = (code: string) => {
    const buffTwo = Buffer.from(code, 'hex')
    return buffTwo.toString('base64')
}


export const codedAuth = fromUTF8ToBase64(SETTINGS.ADMIN)

export const inCodedAuth = fromHexToBase64(SETTINGS.ADMIN)



export const createString = (length: number) => {
    let s = ''
    for (let x = 1; x <= length; x++) {
        s += x % 10
    }
    return s
}