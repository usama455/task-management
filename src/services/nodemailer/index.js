import nodemailer from "nodemailer";
import { logger } from "../../utils";


export const sendEmail = async (to, subject, html) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to,
        subject,
        html,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      logger.info("Email sent: " + info.response)
    } catch (err) {
      logger.error(err)
    }
  };