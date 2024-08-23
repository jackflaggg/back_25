import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common-types";
import {emailAdapter} from "../../utils/adapters/email-adapter";
import {emailManagers} from "../../managers/email-managers";

export const registrationEmailController = async (req: Request, res: Response) => {
    // const subject = 'Test sms';
    // const msg = `This <i>message</i> was sent from <strong>Nod</strong> server.`
    //
    // const sendEmail = await emailManagers.sendEmailRecoveryMessage(subject)
    //
    // if (!sendEmail) {
    //     res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    //     return
    // }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}