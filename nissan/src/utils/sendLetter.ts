import nodemailer from "nodemailer";

export const sendLetter = async (
    email: string,
    body: string,
    title: string
) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        service: "gmail", // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "<spam@gmail.com>", // sender address
        to: email, // list of receivers
        subject: title, // Subject line
        html: body, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
