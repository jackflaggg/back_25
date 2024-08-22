import {emailAdapter} from "../adapters/email-adapter";

export const emailManagers = {
    async sendEmailRecoveryMessage(user: any) {
        const sendEmail = await emailAdapter.sendEmail(user.email, user.subject, user.msg);
    }
}