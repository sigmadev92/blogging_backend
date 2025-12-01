import nodemailer from "nodemailer";
import { NODEMAILER_MAIL, NODEMAILER_PASS } from "../config/env.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODEMAILER_MAIL,
    pass: NODEMAILER_PASS,
  },
});

export default async function sendTheMail({
  receiverMail,
  subject,
  htmlContent,
  from = '"BlogsEra" <no-reply@blogsEra.com>',
}) {
  await transporter.sendMail({
    from,
    to: receiverMail,
    subject,
    html: htmlContent,
  });
}
