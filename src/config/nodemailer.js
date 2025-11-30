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
}) {
  await transporter.sendMail({
    from: NODEMAILER_MAIL,
    to: receiverMail,
    subject,
    html: htmlContent,
  });
}
