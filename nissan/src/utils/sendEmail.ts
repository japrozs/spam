import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrappe
export async function sendEmail(to: string, html: string, type: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //   let testAccount = await nodemailer.createTestAccount();
    //   console.log("Account : ", testAccount);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "qkfrnkvqiykpx47v@ethereal.email", // generated ethereal user
            pass: "WpgRF2Rnz3jCFq8QYQ", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "<spam@gmail.com>", // sender address
        to, // list of receivers
        subject: type == "change" ? "Change Password" : "Verify password", // Subject line
        html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
