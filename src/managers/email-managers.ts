import {emailAdapter} from "../utils/adapters/email-adapter";

export const emailManagers = {
    async sendEmailRecoveryMessage(email: string, subject: string = 'Rasul', confirmationCode: string) {
        const sendEmail = await emailAdapter.sendEmail(email, subject, confirmationCode);
        return sendEmail;
    }
}