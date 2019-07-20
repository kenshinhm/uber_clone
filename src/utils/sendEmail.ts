import mailGun from "mailgun-js";

const mailGunClient = new mailGun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: process.env.MAILGUN_EMAIL || ""
});

const sendEmail = (to: string, subject: string, html: string) => {
    const emailData = {
        from: "kenshinhm@naver.com",
        to,
        subject,
        html
    };
    return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (
    to: string,
    fullName: string,
    key: string
) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by click <a href="http://nuber.com/verification/${key}/">here</a>`;
    return sendEmail(to, emailSubject, emailBody);
};
