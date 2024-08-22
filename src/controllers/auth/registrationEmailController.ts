import {Request, Response} from 'express';
import nodemailer from "nodemailer";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {SETTINGS} from "../../settings";

export const registrationEmailController = async (req: Request, res: Response) => {

    const transporter = nodemailer.createTransport({
        service: 'Mail.ru',
        auth: {
            user: req.body.email,
            pass: SETTINGS.PASS,
        },
        from: SETTINGS.EMAIL_NAME
    })

    const result = await transporter.sendMail({
        from: `"Rasul" <${req.body.email}>`,
        to: `${req.body.email}`,
        subject: 'Rasul',
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