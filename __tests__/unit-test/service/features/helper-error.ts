import {helperError} from "../../../../src/utils/helpers/helper.error";

describe('helperError', () => {
    it('', () => {
        const error = {errorsMessages: [{field: '', message: ''}]};
        const result = helperError(error);
        expect(result).toEqual({field: '', message: ''});
    })
})