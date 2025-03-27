import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com, smtp.mailtrap.io
  port: process.env.SMTP_PORT, // 465 for SSL, 587 for TLS
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your SMTP email
    pass: process.env.SMTP_PASS, // Your SMTP password or app password
  },
});

export const sender = {
  email: process.env.SMTP_USER,
  name: "Pranjal",
};
