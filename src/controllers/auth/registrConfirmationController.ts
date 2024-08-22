import {Request, Response} from 'express';
import nodemailer from 'nodemailer';
import {config} from 'dotenv';
import {HTTP_STATUSES} from "../../models/common/common-types";
config()

export const registrationConfirmationController = async (req: Request, res: Response) => {
    const testEmailAccount = await nodemailer.createTestAccount();
    if (!testEmailAccount) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({status: 'error test email account'});
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'Mail.ru',
        auth: {
            user: testEmailAccount.user, //SETTINGS.EMAIL_NAME,
            pass: testEmailAccount.pass,//SETTINGS.PASS,
        },
        from: testEmailAccount.user
    })

    const result = await transporter.sendMail({
        from: `"Rasul" <${testEmailAccount.user}>`,
        to: 'mihail.golopapa@yandex.ru, n3kiii@yandex.ru',
        subject: 'Сообщение от Инкубатора',
        text: 'Тестовое сообщение. Проверка сервера',
        html: `<h1>Thank for your registration</h1>
                <p>To finish registration please follow the link below:
                <a href='https://somesite.com/confirm-email?code=your_confirmation_code'>complete registration</a>
                </p>`
    });
    console.log(result)
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}