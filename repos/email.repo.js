const nodemailer = require("nodemailer");
const sendEmail = async (toEmail,subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
        },
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: toEmail,
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
};
module.exports={
    sendEmail
}
