import nodemailer from "nodemailer"

export const sendEmail = (email: string, subject: string, text: string): void => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.PASSWORD_APP,
        }
    });

    const mailOptions = {
        from: 'dangcuong201004@gmail.com',
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
}