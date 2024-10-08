import nodemailer from "nodemailer";
import {SETTINGS} from "../../settings";
import {emailTemplates} from "../templates/email-templates";

export const emailAdapter = {
    async sendEmail(emailFrom: string, messageCode: string) {
        // TODO: изменить логику, ибо пароль тогда нужен от разных почт!
        try {
            let transporter = nodemailer.createTransport({
                service: 'Mail.ru',
                auth: {
                    user: SETTINGS.EMAIL_NAME,
                    pass: SETTINGS.PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                }
            });

            let result = await transporter.sendMail({
                from: `"Incubator" <${SETTINGS.EMAIL_NAME}>`,
                to: emailFrom,
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
