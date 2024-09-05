import {emailAdapter} from "../../../src/utils/adapters/email-adapter";
import nodemailer from "nodemailer";
import {SETTINGS} from "../../../src/settings";

jest.mock('nodemailer');

describe('emailAdapter', () => {
    let sendMailMock: jest.SpyInstance;

    beforeEach(() => {
        sendMailMock = jest.fn().mockResolvedValue('Email sent');
        (nodemailer.createTransport as jest.Mock).mockReturnValue({
            sendMail: sendMailMock,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send an email successfully', async () => {
        const emailFrom = 'test@example.com';
        const messageCode = 'ABC123';

        const result = await emailAdapter.sendEmail(emailFrom, messageCode);

        expect(sendMailMock).toHaveBeenCalledWith({
            from: `"Incubator" <${SETTINGS.EMAIL_NAME}>`,
            to: emailFrom,
            subject: 'hello world!',
            html: expect.any(String), // Этот тест будет проверять, что html сообщение было создано
        });
        expect(result).toBe('Email sent');
    });

    it('should handle errors when sending an email', async () => {
        const errorMessage = 'Email send failed';
        sendMailMock.mockRejectedValue(new Error(errorMessage));

        const result = await emailAdapter.sendEmail('fail@example.com', 'CODE123');

        expect(sendMailMock).toHaveBeenCalled();
        expect(result).toEqual(new Error(errorMessage)); // Проверяем, что ошибка возвращается
    });
});