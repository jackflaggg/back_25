import {SETTINGS} from "../../src/settings";
import {fromHexToBase64, fromUTF8ToBase64} from "../../src/utils/features/UTF8ToBase64";

export const codedAuth = fromUTF8ToBase64(SETTINGS.ADMIN)

export const inCodedAuth = fromHexToBase64(SETTINGS.ADMIN)

export const createString = (length: number) => {
    let s = ''
    for (let x = 1; x <= length; x++) {
        s += x % 10
    }
    return s
}