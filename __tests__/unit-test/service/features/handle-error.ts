import { Response } from 'express';
import {handleError} from "../../../src/utils/features/handle-error";
import {HTTP_STATUSES} from "../../../src/models/common/common-types";

describe('handleError', () => {
    let res: Partial<Response>;
    beforeEach(() => {
        res = {
            sendStatus: jest.fn(),
        };
    });
    it('should send status 401', () => {
        handleError(res as Response);

        expect(res.sendStatus).toHaveBeenCalledWith(HTTP_STATUSES.NOT_AUTHORIZATION_401);
    });
})