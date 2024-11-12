import {fromHexToBase64, fromUTF8ToBase64} from "../../../../src/utils/features/UTF8.to.Base64";


describe('fromUTF8ToBase64', () => {

    it('should convert a string to Base64', () => {
        const input = '1234';

        const expectedBase64 = 'MTIzNA==';

        expect(fromUTF8ToBase64(input)).toBe(expectedBase64);
    });

    it('should convert a string to Base64', () => {
        const input = '';

        const expectedBase64 = '';

        expect(fromUTF8ToBase64(input)).toBe(expectedBase64);
    });
})

describe('fromHexToBase64', () => {

    it('should convert a string to Base64', () => {
        const input = 'MTIzNA==';

        const expectedBase64 = '1234';

        expect(fromHexToBase64(input)).toBe(expectedBase64);
    });

    it('should convert a string to Base64', () => {
        const input = '';

        const expectedBase64 = '';

        expect(fromHexToBase64(input)).toBe(expectedBase64);
    });
})