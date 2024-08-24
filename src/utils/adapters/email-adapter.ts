import nodemailer from "nodemailer";
import {SETTINGS} from "../../settings";
import {emailTemplates} from "../templates/email-templates";

export const emailAdapter = {
    async sendEmail(emailFrom: string, messageCode: string) {
        // изменить логику, ибо пароль тогда нужен от разных почт!
        try {
            const transport = nodemailer.createTransport({
                service: 'Mail.ru',
                auth: {
                    user: emailFrom,
                    pass: SETTINGS.PASS,
                }
            });

            const result = await transport.sendMail({
                from: `"Rasul" <${emailFrom}>`,
                to: `${emailFrom}`,
                subject: 'hello world!',
                html: emailTemplates.registrationEmailTemplate(messageCode)
            });

            return result;

        } catch (err) {
            console.error(err);
            return err
        }
    }
}
