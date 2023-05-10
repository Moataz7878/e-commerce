import nodemailer from "nodemailer";

async function sendEmail({ 
    to = '',
 subject = '',
  message = '', 
  attachments = [] 
} = {}) {
    let transporter = nodemailer.createTransport({
        host: "localhost",
    port: 587,
    secure: false,
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Route Academy" <${process.env.SENDER_EMAIL}>`, // sender address
        to,
        subject,
        html:message,
        attachments
    });

    // return info.accepted.length ? false : true
    if (info.accepted.length) {
        return true;
      }
      return false;
}



export default sendEmail