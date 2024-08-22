import nodemailer from "nodemailer";
import {SETTINGS} from "../settings";

export const emailAdapter = {
    async sendEmail(emailFrom: string, subject: string, message: string) {
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
                subject: subject,
                text: 'Тестовое сообщение. Проверка сервера',
                html: message
            });
            return result;

        } catch (err) {
            console.error(err);
            return err
        }
    }
}
