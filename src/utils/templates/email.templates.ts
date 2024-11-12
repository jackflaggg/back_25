export const emailTemplates = {
    registrationEmailTemplate(code: string) {
        console.log('[emailTemplates] это код email: ' + code);
        return `<h1>Thanks for your registration</h1>
        <p>To finish registration please follow the link below:
        <a href='https://localhost.com/confirm-email?code=${code}'>complete registration</a>
        </p>`
    }
}