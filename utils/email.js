const nodemailer = require("nodemailer");
const {APP_CONFIG}=require("../config/app.config");
const sendEmail = async (toEmail,subject, text,fromEmail = APP_CONFIG.USER_EMAIL) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: APP_CONFIG.USER_EMAIL,
            pass: APP_CONFIG.USER_PASS
        },
    });

    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
};
module.exports={
    sendEmail
}
